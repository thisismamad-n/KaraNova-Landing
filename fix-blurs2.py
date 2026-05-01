with open('/app/app/landing/page.tsx', 'r') as f:
    content = f.read()

last_idx = content.rfind("filter: 'blur(8px)',")
content = content[:last_idx] + "filter: 'blur(40px)'," + content[last_idx + len("filter: 'blur(8px)',"):]

with open('/app/app/landing/page.tsx', 'w') as f:
    f.write(content)
