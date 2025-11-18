/**
 * StructuredData Component
 * 
 * Renders JSON-LD structured data for SEO with XSS protection
 * Follows Next.js best practices by escaping < characters
 */
export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
