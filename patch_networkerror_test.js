const fs = require('fs');

const file = 'app/_components/shared/NetworkError.test.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file is using Jest/Vitest's global 'vi' instead of bun's 'mock'.
// From instructions: Test files ported from Vitest/Jest that contain global vi methods must be migrated to use import { mock } from 'bun:test' and mock.module()

content = content.replace(/import \{ describe, it, expect, vi \} from "vitest";/g, 'import { describe, it, expect, mock } from "bun:test";');
content = content.replace(/import \{ describe, it, expect \} from "vitest";/g, 'import { describe, it, expect, mock } from "bun:test";');

// Fix vi.mock -> mock.module
content = content.replace(/vi\.mock\("framer-motion", \(\) => \(\{/g, 'mock.module("framer-motion", () => ({');
content = content.replace(/vi\.mock\("lucide-react", \(\) => \(\{/g, 'mock.module("lucide-react", () => ({');

fs.writeFileSync(file, content);
