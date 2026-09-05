import os
import re
import json
import openai  # 使用 OpenAI 兼容库
import frontmatter
import yaml
import datetime
from datetime import datetime, date as date_only
import urllib.request
import unicodedata
import slugify
import shutil
from pathlib import Path

# Configuration
BASE_DIR = Path("content")
INBOX_DIR = "inbox/Clippings"
openai.api_key = os.environ.get('DEEPSEEK_API_KEY')  # 从环境变量中获取 DeepSeek API 密钥
openai.api_base = "https://api.deepseek.com/v1"

# Function to check if a string contains Chinese characters
def is_chinese(title):
    for char in title:
        if '一' <= char <= '鿿':  # 基本的中文字符范围判断
            return True
    return False

# Function to serialize datetime objects
def serialize_datetime(obj):
    if isinstance(obj, dict):
        return {k: serialize_datetime(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [serialize_datetime(elem) for elem in obj]
    elif isinstance(obj, datetime):
        return obj.strftime('%Y-%m-%d %H:%M:%S')
    else:
        return obj

# Function to create slug from title
def create_slug(title):
    return slugify.slugify(title, separator="-", lowercase=True)

# Function to parse the model's JSON response, tolerating stray code fences
def _parse_summary_json(text: str) -> dict:
    text = text.strip()
    if text.startswith("```"):
        text = text.strip("`")
        if text.lower().startswith("json"):
            text = text[4:]
        text = text.strip()
    return json.loads(text)

# Function to generate summary, key points and a bias/reliability check using DeepSeek's model
def generate_summary_and_points(content: str) -> dict:
    prompt = """
    你是一个帮我整理"稍后阅读"文章存档的助手。请仔细阅读下面的文章正文，只输出一段 JSON，不要输出任何 JSON 之外的文字、解释或代码块标记。

    JSON 需要包含以下字段：

    - "summary": 一段中文摘要，控制在 380 个汉字以内，不分段，完整传达文章的核心内容、作者表达的主要观点以及解决的问题。
    - "key_points": 一个字符串数组，列出文章真正重要的核心论点或结论。数量由文章实际内容决定，通常 3-6 条即可，不要为了凑数量而拆分、注水或重复表达，也不要遗漏关键内容；如果文章本身观点很少，给 2-3 条也完全可以。每条尽量简洁、有信息量，避免空泛的套话。
    - "bias_check": 一到两句中文点评，扮演一个媒体素养/事实核查的角色，判断文章整体上更偏向客观事实陈述，还是带有明显个人观点、情绪化或片面倾向的表达。如果发现明显带情绪、片面或带说服意图的措辞，指出具体属于哪一类（例如：使用绝对化字眼、只呈现单方立场、诉诸恐惧或愤怒、以偏概全等），并尽量从原文摘录一个有代表性的短语作为例子；如果文章整体克制、论证平衡、没有明显问题，直接回答"未见明显情绪化或片面表达"，不要为了显得有内容而牵强找茬。

    ## 约束：
    - 尽可能还原文章中的专业词汇，并对其进行通俗解释。
    - "summary" 和 "key_points" 必须完全按照文章作者表达的内容进行整理，不要添加你自己的观点；"bias_check" 是唯一允许你做出自己判断的字段。
    - 所有输出使用简体中文。
    - 文章内容里的"我"是文章的原作者，不要代入 TangYuan 的身份。
    """

    response = openai.ChatCompletion.create(
        model="deepseek-chat",  # 使用 DeepSeek 模型
        messages=[
            {
                "role": "system",
                "content": "You are an excellent assistant generating article summaries. Always respond with a single JSON object and nothing else.",
            },
            {"role": "user", "content": f"{prompt}\n\n文章内容:\n{content}"},
        ],
        response_format={"type": "json_object"},
        stream=False,
    )
    return _parse_summary_json(response.choices[0].message.content)

# Function to render the summary JSON as the markdown callout block used at the top of each page
def format_summary_block(summary_data: dict) -> str:
    lines = ["> **摘要**:", f"> {summary_data['summary']}", "> "]
    lines.append("> **要点总结**:")
    for index, point in enumerate(summary_data.get('key_points', []), start=1):
        lines.append(f"> {index}. {point}")
    bias_check = summary_data.get('bias_check')
    if bias_check:
        lines.append("> ")
        lines.append(f"> **客观性检查**: {bias_check}")
    return "\n".join(lines)

# Function to process YAML metadata
def process_metadata(metadata):
    # 不同来源的 clipping frontmatter 字段名不完全一致：新版用
    # created/published，另一些版本直接用 date/updated。两者都接受。
    title = metadata.get('title')
    created = metadata.get('created', metadata.get('date'))
    if not title or not created:
        raise KeyError("Missing required frontmatter fields: 'title' and/or 'created'/'date'")
    published = metadata.get('published', metadata.get('updated', created))

    new_metadata = {
        'title': title,
        'date': created,
        'updated': published,
        'taxonomies': {
            'tags': metadata.get('tags') or []
        },
        'extra': {
            'source': metadata.get('source', ''),
            'hostname': metadata.get('hostname', ''),
            'author': metadata.get('author', ''),
            'original_title': metadata.get('original_title', title),
            'original_lang': 'zh' if is_chinese(title) else 'en'
        }
    }
    return new_metadata

# Function to download images and update markdown references
def download_images_and_update_refs(content, folder_path):
    pattern = r'!\[(.*?)\]\((.*?)\)'
    def replace_image(match):
        desc, url = match.groups()
        filename = url.split('/')[-1]  # 假设文件名为 URL 的最后一部分
        local_path = folder_path / filename
        try:
            urllib.request.urlretrieve(url, local_path)
            return f'![{desc}]({filename})'
        except Exception as e:
            print(f"Failed to download image {url}: {e}")
            return match.group(0)  # 下载失败时返回原始内容
    
    return re.sub(pattern, replace_image, content)

# Function to process a single Markdown file
def process_markdown_file(file_path: Path):
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    content = post.content.strip()
    
    # 检查文件是否已处理（标题和作者相同则跳过）
    existing_files = list(Path(BASE_DIR).rglob("index.md"))
    for existing_file in existing_files:
        with open(existing_file, 'r', encoding='utf-8') as ef:
            existing_post = frontmatter.load(ef)
            existing_author = existing_post.get('extra', {}).get('author')
            if existing_post.get('title') == post.get('title') and existing_author == post.get('author'):
                print(f"Skipping file as it already exists with same title and author: {file_path}")
                return

    # 处理元数据
    new_metadata = process_metadata(post.metadata)
    yaml_frontmatter = yaml.dump(new_metadata, allow_unicode=True, sort_keys=False)

    # 创建新的文件夹结构
    date = new_metadata['date']
    if isinstance(date, str):
        # 如果是字符串，解析 ISO 格式 (如 "2025-01-25T22:37:47+08:00")
        date_obj = datetime.fromisoformat(date)
    elif isinstance(date, datetime):
        # 如果已经是 datetime 对象，直接使用
        date_obj = date
    elif isinstance(date, date_only):
        # YAML 把不带时间的日期（如 "2025-01-25"）解析成 date 而非 datetime
        date_obj = datetime(date.year, date.month, date.day)
    else:
        raise ValueError(f"Unsupported date type: {type(date)}")

    # 先生成摘要，成功后再落盘，避免摘要生成失败时在 content/ 里留下
    # 一个 frontmatter 不对、也没有摘要的半成品页面
    summary_data = generate_summary_and_points(content)
    summary_block = format_summary_block(summary_data)

    # 使用 date_obj 构建路径
    new_folder = BASE_DIR / f"{date_obj.year}/{date_obj.month:02d}/{date_obj.day:02d}/{create_slug(new_metadata['title'])}"
    new_folder.mkdir(parents=True, exist_ok=True)

    # 移动并重命名文件
    new_file_path = new_folder / "index.md"
    shutil.copy2(str(file_path), str(new_file_path))  # 使用 copy2 保持原有元数据

    # 下载图片并更新 Markdown 中的引用
    with open(new_file_path, 'r+', encoding='utf-8') as f:
        content = f.read()
        parts = content.split('---', 2)
        if len(parts) > 2:
            content_without_yaml = parts[2]
        else:
            content_without_yaml = content
        new_content = download_images_and_update_refs(content_without_yaml, new_folder)
        f.seek(0)
        f.write(f"---\n{yaml_frontmatter}---\n\n{summary_block}\n\n---\n\n{new_content}")
        f.truncate()

# Function to process all Markdown files in the inbox
def process_markdown_files():
    for file in Path(INBOX_DIR).glob("*.md"):
        try:
            process_markdown_file(file)
        except Exception as e:
            print(f"Skipping {file} due to error: {e}")

# Main execution
if __name__ == "__main__":
    process_markdown_files()
