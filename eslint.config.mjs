import nextConfig from 'eslint-config-next/core-web-vitals'
import security from 'eslint-plugin-security'
import importX from 'eslint-plugin-import-x'

const eslintConfig = [
  ...nextConfig,
  {
    plugins: {
      security,
      'import-x': importX,
    },
    rules: {
      // Security rules (non-strict, practical defaults)
      'security/detect-object-injection': 'off', // Too many false positives
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'warn',
      'security/detect-possible-timing-attacks': 'warn',
      'security/detect-pseudoRandomBytes': 'warn',

      // Import/Performance rules
      'import-x/no-duplicates': 'warn',
      'import-x/no-cycle': 'warn',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
    ],
  },
]

export default eslintConfig
