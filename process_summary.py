import os
from pathlib import Path
from openai import OpenAI
import frontmatter
import yaml
from datetime import datetime

# Configuration
BASE_DIR = "content"
client = OpenAI(
    api_key=os.getenv("DEEPSEEK_API_KEY"),  # 从环境变量中获取 API 密钥 
    base_url="https://api.deepseek.com"    # DeepSeek API base url
)

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
    - “摘要”和“要点总结”只需要按照markdown格式加粗，不要用标题格式。
    - 最终生成的内容只包括“摘要”和“要点总结”两个部分，“要点总结”部分严格按照有序列表生成。
    - 不要在“摘要”和“要点总结”的部分之外增加额外的总结和你的想法。
    - “摘要”的内容不要分段，保持一个段落。

    ## OutputFormat:
    **摘要**：
    {摘要}
    **要点总结**：
    {要点总结}
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

# Function to process a single Markdown file
def process_markdown_file(file_path: Path):
    with open(file_path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    content = post.content.strip()
    
    # Check if content already contains the summary blockquote
    if content.startswith("> **摘要**：") and "> **要点总结**：" in content:
        print(f"File already contains summary and key points, skipping: {file_path}")
        return
    
    # Serialize metadata
    metadata_serialized = serialize_datetime(post.metadata)
    yaml_frontmatter = yaml.dump(metadata_serialized, allow_unicode=True, sort_keys=False)
    
    # Generate summary and key points
    summary_and_points = generate_summary_and_points(post.content)
    print(f"Generated summary and key points for: {file_path}")
    
    # Format summary and key points as blockquote
    blockquote_summary_and_points = "\n".join([f"> {line}" for line in summary_and_points.split("\n")])
    
    # Reconstruct the file content
    updated_content = (
        f"---\n{yaml_frontmatter.strip()}\n---\n\n"
        f"{blockquote_summary_and_points}\n\n---\n\n"
        f"{post.content}"
    )
    
    # Write back to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(updated_content)
    # print(f"Updated file: {file_path}")

# Function to process all Markdown files in a directory
def process_markdown_files(base_dir: str):
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith(".md"):
                file_path = Path(root) / file
                process_markdown_file(file_path)

# Main execution
if __name__ == "__main__":
    process_markdown_files(BASE_DIR)
