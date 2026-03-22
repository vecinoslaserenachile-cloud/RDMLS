with open(r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

print(f"Total curly opens: {content.count('{')}")
print(f"Total curly closes: {content.count('}')}")
print(f"Total parens opens: {content.count('(')}")
print(f"Total parens closes: {content.count(')')}")
print(f"Total square opens: {content.count('[')}")
print(f"Total square closes: {content.count(']')}")
