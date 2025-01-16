import os
import re
from openai import OpenAI
import frontmatter
import yaml
import datetime
from datetime import datetime
import urllib.request
import unicodedata
import slugify
import shutil
from pathlib import Path


# Configuration
BASE_DIR = Path("content")
INBOX_DIR = "inbox/48 Clippings"
client = OpenAI(
    api_key='sk-1b625fdf06dc404bb98477dadd29c469',  # 从环境变量中获取 API 密钥 
    base_url="https://api.deepseek.com"    # DeepSeek API base url
)

# Function to check if a string contains Chinese characters
def is_chinese(title):
    for char in title:
        if '一' <= char <= '\u9fff':  # Basic range for Chinese characters
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

# Function to generate summary and key points
def generate_summary_and_points(content: str) -> str:
    prompt = """
    ## Goals:
    - 第一步，仔细阅读文章内容。
    - 第二步，对每个段落进行总结，总结文章的主要内容，理清楚作者表达了什么观点、作者解决了哪些具体的问题。
    - 第三步，文章要点总结。根据原文内容，提炼出文章的5个以内的主要观点或作者解决的问题。
    - 第四步，根据上面三步，按照指定的输出格式，整理出文章内容的总结。

    ## Skills:
    - 善于用流畅通顺的简体中文总结内容重点。
    - 具有良好的逻辑思维能力，能够深入分析文章内容。
    - 掌握文章相关领域的专业知识，能够准确理解和阐述专业概念。
    - 擅长以通俗易懂的方式解释复杂的专业内容。

    ## Constraints:
    - 文章内容总结的{摘要}字数控制在380个中文汉字以内。
    - 尽可能还原文章中的专业词汇，并对其进行通俗解释。
    - 在总结的过程中，完全按照文章作者的表达内容进行整理，不添加你的额外观点。
    - 所有输出用中文生成。
    - 文章内容里的"我"是文章的原作者，不要代入 Vandee 的身份。
    - 按照outputformat指定的格式输出最终内容。
    - “摘要”和“要点总结”使用Markdown callout语法。
    - 最终生成的内容只包括“摘要”和“要点总结”两个部分，“要点总结”部分严格按照有序列表生成。
    - 不要在“摘要”和“要点总结”的部分之外增加额外的总结和你的想法。
    - “摘要”的内容不要分段，保持一个段落。

    ## OutputFormat:
    > **摘要：**
    > {摘要}  
    >
    > **要点总结：**
    > {要点总结}
    """
    
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "You are an excellent assistant generating article summaries."},
            {"role": "user", "content": f"{prompt}\n\nArticle content:\n{content}"},
        ],
        stream=False,
    )
    return response.choices[0].message.content

# Function to process YAML metadata
def process_metadata(metadata):
    # print(isinstance(metadata['date'], datetime))
    date = metadata['date']
    # date = datetime.strptime(metadata['date'], '%Y-%m-%dT%H:%M:%S%z')
    # date = datetime.datetime.strptime(metadata['date'], '%Y-%m-%dT%H:%M:%S%z')
    # date = metadata['date'].strftime('%Y-%m-%dT%H:%M:%S%z')
    slug = create_slug(metadata['title'])
    
    new_metadata = {
        'title': metadata['title'],
        'date': metadata['date'],
        'updated': metadata['updated'],
        'taxonomies': {
            'tags': metadata.get('tags', [])
        },
        'extra': {
            'source': metadata.get('source', ''),
            'hostname': metadata.get('hostname', ''),
            'author': metadata.get('author', ''),
            'original_title': metadata.get('original_title', metadata['title']),
            'original_lang': 'zh' if is_chinese(metadata['title']) else 'en'
        }
    }
    return new_metadata

# Function to download images and update markdown references
def download_images_and_update_refs(content, folder_path):
    pattern = r'!\[(.*?)\]\((.*?)\)'
    def replace_image(match):
        desc, url = match.groups()
        filename = url.split('/')[-1]  # Assuming filename is the last part of the URL
        local_path = folder_path / filename
        try:
            urllib.request.urlretrieve(url, local_path)
            return f'![{desc}]({filename})'
        except Exception as e:
            print(f"Failed to download image {url}: {e}")
            return match.group(0)  # Return original if download fails
    
    return re.sub(pattern, replace_image, content)

# Function to process a single Markdown file
def process_markdown_file(file_path: Path):
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    content = post.content.strip()
    
    # Check if this file should be processed (new or updated)
    existing_files = list(Path(BASE_DIR).rglob("index.md"))
    for existing_file in existing_files:
        with open(existing_file, 'r', encoding='utf-8') as ef:
            existing_post = frontmatter.load(ef)
            if existing_post.get('title') == post.get('title') and existing_post.get('author') == post.get('author'):
                print(f"Skipping file as it already exists with same title and author: {file_path}")
                return

    # Process metadata
    new_metadata = process_metadata(post.metadata)
    yaml_frontmatter = yaml.dump(new_metadata, allow_unicode=True, sort_keys=False)

    # Create new folder structure
    # print(isinstance(new_metadata['date'],datetime))
    # date = new_metadata['date'].strftime('%Y-%m-%dT%H:%M:%S+08:00')
    # date = datetime.strptime(new_metadata['date'], '%Y-%m-%dT%H:%M:%S+08:00')
    # date = new_metadata['date'].strftime('%Y-%m-%dT%H:%M:%S%z')
    date = new_metadata['date']
    # print(create_slug(new_metadata['title']))
    new_folder = BASE_DIR/f"{date[0:4]}/{date[5:7]}/{date[8:10]}/{create_slug(new_metadata['title'])}"
    new_folder.mkdir(parents=True, exist_ok=True)

    # Move and rename the file
    new_file_path = new_folder / "index.md"
    # shutil.move(str(file_path), str(new_file_path))
    shutil.copy2(str(file_path), str(new_file_path))  # Use copy2 to maintain metadata

    # Generate summary and key points
    summary_and_points = generate_summary_and_points(content)

    # Download images and update references
    with open(new_file_path, 'r+', encoding='utf-8') as f:
        content = f.read()
        # Split content into YAML and the rest
        parts = content.split('---', 2)
        if len(parts) > 2:
            # Remove the original YAML, keep only the content part
            content_without_yaml = parts[2]
        else:
            content_without_yaml = content  # If no YAML was found, use the whole content
        new_content = download_images_and_update_refs(content_without_yaml, new_folder)
        f.seek(0)
        f.write(f"---\n{yaml_frontmatter}---\n\n{summary_and_points}---\n\n{new_content}")
        f.truncate()

# Function to process all Markdown files in the inbox
def process_markdown_files():
    for file in Path(INBOX_DIR).glob("*.md"):
        process_markdown_file(file)

# Main execution
if __name__ == "__main__":
    process_markdown_files()
