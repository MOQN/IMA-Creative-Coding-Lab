import os

def generate_markdown(output_filename='folder_links.md'):
    folders = [name for name in os.listdir('.') if os.path.isdir(name)]
    
    lines = []
    for folder in sorted(folders):
        line = f'[{folder}](examples/{folder}/README.md)'
        lines.append(line)

    with open(output_filename, 'w') as f:
        f.write('\n\n'.join(lines))

    print(f"Markdown file '{output_filename}' created with {len(lines)} entries.")

if __name__ == "__main__":
    generate_markdown()
