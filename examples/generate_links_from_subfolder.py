import os

def generate_markdown(output_filename='FOLDER_LINKS.md'):
    parent_child_map = {}
    for parent in os.listdir('.'):
        parent_path = os.path.join('.', parent)
        if os.path.isdir(parent_path):
            children = []
            for child in os.listdir(parent_path):
                child_path = os.path.join(parent_path, child)
                if os.path.isdir(child_path):
                    children.append(child)
            if children:
                parent_child_map[parent] = sorted(children)

    lines = []
    for parent in sorted(parent_child_map.keys()):
        lines.append(f'### {parent}\n')
        for child in parent_child_map[parent]:
            folder_path = f'{parent}/{child}'
            line = f'- [{folder_path}](examples/{folder_path}/README.md)'
            lines.append(line)
        lines.append('')  # Add a blank line after each parent group

    with open(output_filename, 'w') as f:
        f.write('\n'.join(lines))

    print(f"Markdown file '{output_filename}' created with {sum(len(children) for children in parent_child_map.values())} entries.")

if __name__ == "__main__":
    generate_markdown()
