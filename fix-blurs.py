with open('/app/app/landing/page.tsx', 'r') as f:
    content = f.read()

# Fix the incorrect sed replacement
content = content.replace("filter: 'blur(8px)',", "filter: 'blur(8px)',", 1) # first is right
# find second
first_idx = content.find("filter: 'blur(8px)',")
second_idx = content.find("filter: 'blur(8px)',", first_idx + 1)
content = content[:second_idx] + "filter: 'blur(20px)'," + content[second_idx + len("filter: 'blur(8px)',"):]

with open('/app/app/landing/page.tsx', 'w') as f:
    f.write(content)
