/**
 * StructuredData Component
 * 
 * Renders JSON-LD structured data for SEO with XSS protection
 * Escapes characters that can break out of script tags or cause parse errors.
 */

// Move escapeMap outside to prevent recreation on every match
const ESCAPE_MAP: Record<string, string> = {
  '<': '\\u003c',
  '>': '\\u003e',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

export default function StructuredData({ data }: { data: object }) {
  // Use a comprehensive replacer to prevent script tag breakouts and line terminator issues
  const safeJsonLd = JSON.stringify(data).replace(/[<>\u2028\u2029]/g, (match) => {
    return ESCAPE_MAP[match] as string;
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}
