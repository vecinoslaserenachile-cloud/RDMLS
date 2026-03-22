with open(r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

block = "".join(lines[822:1275]) # Lines 823 to 1275 (0-indexed)

print(f"Opens (:: {block.count('(')}")
print(f"Closes ):: {block.count(')')}")
print(f"Opens {{:: {block.count('{')}")
print(f"Closes }}:: {block.count('}')}")
