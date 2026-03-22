import re

def check_braces(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Concatenate without comments/strings for matching but keep original for snippets
    full_text = "".join(lines)
    
    # Simple character by character scan on modified text
    p_text = re.sub(r'//.*', lambda m: ' ' * len(m.group(0)), full_text)
    p_text = re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)), p_text, flags=re.DOTALL)
    
    # Preservar strings pero vaciarlas
    def str_repl(m):
        return m.group(0)[0] + ' ' * (len(m.group(0))-2) + m.group(0)[-1]
    
    p_text = re.sub(r'\'[^\']*\'', str_repl, p_text)
    p_text = re.sub(r'\"[^\"]*\"', str_repl, p_text)
    p_text = re.sub(r'`[^`]*`', str_repl, p_text, flags=re.DOTALL)

    opens = []
    for i, char in enumerate(p_text):
        if char == '{':
            opens.append(i)
        elif char == '}':
            if opens:
                opens.pop()
            else:
                l = p_text.count('\n', 0, i) + 1
                print(f"EXTRA CLOSING BRACE at line {l}: {lines[l-1].strip()}")

    for op in opens:
        l = p_text.count('\n', 0, op) + 1
        print(f"UNCLOSED OPENING BRACE at line {l}: {lines[l-1].strip()}")

check_braces(r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx')
