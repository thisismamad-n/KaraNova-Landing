const fs = require('fs');

const file = 'app/_components/shared/NetworkError.test.tsx';
let content = fs.readFileSync(file, 'utf8');

// replace vi.fn() with mock()
content = content.replace(/vi\.fn\(\)/g, 'mock()');

fs.writeFileSync(file, content);
