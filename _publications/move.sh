for d in */ ; do
    # Get rid of trailing slash in folder name
    name=$(basename "$d")
    # Move and rename index.md to parent directory
    if [ -f "$d/index.md" ]; then
        mv "$d/index.md" "./${name}.md"
    fi
done
# Remove all (now empty) folders
find . -type d -empty -delete
