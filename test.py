file_path = "./server/src/methods/semanticHighlighting/tokenVisitors.ts"
count = 0

with open(file_path, "r") as file:
    for line in file:
        line = line.strip()
        if line.startswith("visit"):
            count += 1

print(f"Number of lines starting with 'visitor': {count}")
