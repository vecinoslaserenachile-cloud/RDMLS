with open(r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

def count_braces(start, end):
    o = 0
    c = 0
    for i in range(start, end):
        l = lines[i]
        o += l.count('{')
        c += l.count('}')
    return o, c

print(f"App (L118-123): {count_braces(117, 122)}")
print(f"AppContent Hooks (L124-826): {count_braces(123, 826)}")
print(f"AppContent Return (L827-1278): {count_braces(126, 1278)}")
print(f"AppLoginOverlay (L1280-1416): {count_braces(1279, 1416)}")
