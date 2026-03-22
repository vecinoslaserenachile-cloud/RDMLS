import os

file_path = r'c:\Users\estud\APP_LS_SEGURA\src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Part 1: Imports and App (1-123)
part1 = lines[:123]

# Part 2: AppContent synthesized
# (I will take the states from my previous successful replace)
states = lines[123:198]

# (I will take the hooks and effects from the first block)
# Note: In Step 359, the first block of handlers/effects was from 199 to 623
hooks = lines[198:623]
# Ensure it is closed correctly
if not hooks[-1].strip().endswith('});'):
    hooks.append('    };\n')
    hooks.append('  }, []);\n')

# Part 3: Return block (from 827 in Step 362)
# Wait, I need to find where the return block starts in the CURRENT lines
# Since I deleted some lines in Step 366, the indices shifted.
# I'll search for the return line.
return_idx = -1
for i, line in enumerate(lines):
    if 'return (' in line and i > 600:
        return_idx = i
        break

if return_idx == -1:
    raise Exception("Could not find return block")

part3 = lines[return_idx:1083] # AppContent return ends at export or AppLoginOverlay

# Part 4: AppLoginOverlay (until end)
overlay_idx = -1
for i, line in enumerate(lines):
    if 'function AppLoginOverlay' in line:
        overlay_idx = i
        break

if overlay_idx == -1:
    raise Exception("Could not find AppLoginOverlay")

part4 = lines[overlay_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(part1)
    f.writelines(states)
    f.writelines(['\n'])
    f.writelines(hooks)
    f.writelines(['\n'])
    f.writelines(part3)
    f.writelines(part4)
