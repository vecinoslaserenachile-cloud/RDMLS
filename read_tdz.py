with open('dist/assets/index-6ZD64202.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

line = lines[205]  # L206 (0-indexed)
col = 16238
print("CONTEXT:", repr(line[max(0, col-300):col+300]))
