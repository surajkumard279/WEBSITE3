import os
import zipfile

def create_zip():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    public_dir = os.path.join(project_root, 'public')
    os.makedirs(public_dir, exist_ok=True)
    zip_filename = os.path.join(public_dir, 'aleph-technologies-source.zip')

    exclude_dirs = {'.git', 'node_modules', 'dist', '.cache', '__pycache__', '.vercel', '.output'}
    exclude_files = {'.DS_Store'}

    count = 0
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(project_root):
            dirs[:] = [d for d in dirs if d not in exclude_dirs and not d.startswith('.')]
            for file in files:
                if file in exclude_files or file.endswith('.zip'):
                    continue
                filepath = os.path.join(root, file)
                relpath = os.path.relpath(filepath, project_root)
                if not relpath.startswith(('node_modules', 'dist', '.git', '.cache')):
                    zipf.write(filepath, relpath)
                    count += 1

    size_kb = round(os.path.getsize(zip_filename) / 1024, 2)
    print(f"Created {zip_filename} with {count} files ({size_kb} KB)")

if __name__ == '__main__':
    create_zip()
