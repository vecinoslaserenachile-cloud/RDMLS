with open(r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(822, 1275):
    l = lines[i]
    o = l.count('{')
    c = l.count('}')
    if o != c:
        print(f"L{i+1}: Opens {o}, Closes {c} | {l.strip()}")
