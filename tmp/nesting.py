def check_nesting(text):
    stack = []
    for i, char in enumerate(text):
        if char == '{':
            stack.append(('{', i))
        elif char == '}':
            if stack and stack[-1][0] == '{':
                stack.pop()
            else:
                print(f"Extra closing brace at index {i}")
        elif char == '(':
            stack.append(('(', i))
        elif char == ')':
            if stack and stack[-1][0] == '(':
                stack.pop()
            else:
                print(f"Extra closing paren at index {i}")
    
    for s, pos in stack:
        line = text.count('\n', 0, pos) + 1
        snippet = text[pos:pos+50].replace('\n', ' ')
        print(f"Unclosed {s} at line {line}: {snippet}")

with open(r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx', 'r', encoding='utf-8') as f:
    check_nesting(f.read())
