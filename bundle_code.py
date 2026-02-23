import os

# The name of the text file that will be generated
OUTPUT_FILE = "ghostwire_web_source_code.txt"

# Folders we DO NOT want to send to the AI
IGNORE_DIRS = {
    "node_modules",
    ".next",
    ".git",
    ".vscode",
    "public" # Assuming your public folder only holds images/3D models
}

# Only include these code/text file types
ALLOWED_EXTENSIONS = {
    ".ts", 
    ".tsx", 
    ".js", 
    ".jsx", 
    ".css", 
    ".json"
}

# Specific files to ignore (like massive package lock files)
IGNORE_FILES = {
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "bundle_code.py" # Ignore this script itself
}

def create_bundle(root_dir="."):
    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        # Walk through the directory structure
        for dirpath, dirnames, filenames in os.walk(root_dir):
            
            # Remove ignored directories from the search path
            dirnames[:] = [d for d in dirnames if d not in IGNORE_DIRS]

            for filename in filenames:
                if filename in IGNORE_FILES:
                    continue

                ext = os.path.splitext(filename)[1].lower()
                
                # If it's a valid code file, add it to the text file
                if ext in ALLOWED_EXTENSIONS:
                    filepath = os.path.join(dirpath, filename)
                    rel_path = os.path.relpath(filepath, root_dir)

                    # Create a nice header for the AI to read
                    outfile.write("=" * 80 + "\n")
                    outfile.write(f"FILE: {rel_path}\n")
                    outfile.write("=" * 80 + "\n\n")

                    try:
                        with open(filepath, "r", encoding="utf-8") as infile:
                            outfile.write(infile.read() + "\n\n")
                    except Exception as e:
                        outfile.write(f"// Error reading file: {e}\n\n")

    print(f"✅ Success! All code has been bundled into: {OUTPUT_FILE}")
    print("You can now copy the contents of that file into ChatGPT.")

if __name__ == "__main__":
    create_bundle()