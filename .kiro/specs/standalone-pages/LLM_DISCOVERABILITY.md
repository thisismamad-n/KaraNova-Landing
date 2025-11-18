# LLM Discoverability Implementation

## Overview

This document describes the implementation of LLM (Large Language Model) discoverability features for the Karanova website. These features ensure that AI agents like ChatGPT, Claude, Perplexity, and other LLMs can easily discover, understand, and reference Karanova's products and services.

## What is LLM Discoverability?

LLM discoverability refers to making your website's content easily accessible and understandable to AI language models. This is achieved through:

1. **Structured text files** (`llm.txt`, `llms.txt`) that provide comprehensive information in a format optimized for LLM consumption
2. **Robots.txt directives** that explicitly allow LLM crawlers
3. **HTML link references** that help LLMs discover these files
4. **Structured data** (JSON-LD) that provides machine-readable context

## Why This Matters

As AI-powered search and discovery becomes more prevalent, users increasingly rely on:
- ChatGPT for research and recommendations
- Claude for analysis and comparisons
- Perplexity for search and discovery
- Other AI agents for various tasks

By implementing LLM discoverability, Karanova ensures that when users ask these AI systems about:
- "Business management software in Iran"
- "AI-powered project management tools"
- "Persian language business intelligence platforms"
- "Project management solutions with AI"

The AI can accurately describe Karanova's offerings, features, and benefits.

## Implementation Details

### 1. LLM Information Files

#### `/public/llm.txt` - Comprehensive Information
A detailed, structured text file containing:

**Company Information:**
- Name, website, industry
- Target market and languages
- Contact information

**Products & Services:**
- Detailed descriptions of Inova, TaskEase, and BIQ
- Key features and capabilities
- URLs for each product

**Key Features:**
- 24/7 AI assistance
- Bilingual support (Persian/English)
- RTL support
- Multi-tenant architecture
- Real-time collaboration

**Use Cases:**
- Entrepreneurs
- Project managers
- Business analysts
- Marketing teams
- Supply chain managers
- Risk managers

**Competitive Advantages:**
- Specialized for Iranian market
- Four specialized AI advisors
- 60% time reduction in project management
- 92% accuracy in business analysis

**Technical Information:**
- Technology stack
- API access
- Integration options
- System requirements

**SEO Keywords:**
- Primary and secondary keywords
- Long-tail keywords for specific searches

#### `/public/llms.txt` - Concise Summary
A shorter version for quick reference:
- Core products overview
- Key URLs
- Main features
- Target users
- Technology stack
- Reference to full llm.txt

### 2. Robots.txt Configuration

Updated `app/robots.ts` to include specific rules for LLM crawlers:

```typescript
{
  userAgent: "GPTBot",
  allow: ["/", "/llm.txt", "/llms.txt"],
  disallow: ["/api/", "/admin/", "/private/"],
},
{
  userAgent: "ChatGPT-User",
  allow: ["/", "/llm.txt", "/llms.txt"],
  disallow: ["/api/", "/admin/", "/private/"],
},
{
  userAgent: "Claude-Web",
  allow: ["/", "/llm.txt", "/llms.txt"],
  disallow: ["/api/", "/admin/", "/private/"],
},
{
  userAgent: "anthropic-ai",
  allow: ["/", "/llm.txt", "/llms.txt"],
  disallow: ["/api/", "/admin/", "/private/"],
},
{
  userAgent: "PerplexityBot",
  allow: ["/", "/llm.txt", "/llms.txt"],
  disallow: ["/api/", "/admin/", "/private/"],
}
```

**Supported LLM Crawlers:**
- **GPTBot** - OpenAI's web crawler
- **ChatGPT-User** - ChatGPT browsing mode
- **Claude-Web** - Anthropic's Claude web access
- **anthropic-ai** - Anthropic's general crawler
- **PerplexityBot** - Perplexity AI's crawler

### 3. HTML Link References

Added to `app/layout.tsx` in the `<head>` section:

```html
<link rel="alternate" type="text/plain" href="/llm.txt" title="LLM Information" />
<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Summary" />
```

These links help LLMs discover the information files through standard HTML link discovery mechanisms.

### 4. Structured Data Enhancement

Enhanced JSON-LD structured data with XSS protection:

```typescript
// StructuredData component with XSS protection
dangerouslySetInnerHTML={{
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
}}
```

This follows Next.js best practices for secure JSON-LD rendering.

## Content Strategy for LLM Files

### Information Architecture

The `llm.txt` file is organized in a hierarchical structure:

1. **Header** - Company name and tagline
2. **Company Information** - Basic facts
3. **Products & Services** - Detailed product descriptions
4. **Key Features** - Platform capabilities
5. **Documentation** - Links to resources
6. **Company Pages** - Navigation links
7. **Technology Stack** - Technical details
8. **Use Cases** - Target audience scenarios
9. **Competitive Advantages** - Differentiators
10. **Pricing & Plans** - Commercial information
11. **Support & Resources** - Help channels
12. **Social Media** - Social presence
13. **SEO Keywords** - Search optimization
14. **For AI Agents & LLMs** - Direct guidance for AI
15. **Technical Information** - Developer resources

### Writing Style

- **Clear and concise** - Easy for LLMs to parse
- **Structured format** - Consistent headings and sections
- **Factual** - No marketing fluff
- **Comprehensive** - All key information included
- **Bilingual keywords** - Both Persian and English terms
- **Actionable** - Specific URLs and contact methods

### Maintenance

The LLM files should be updated when:
- New products or features are launched
- Pricing or plans change
- Contact information changes
- Major company updates occur
- New use cases are identified
- Technology stack changes

**Recommended update frequency:** Quarterly or after major releases

## Testing & Verification

### How to Test

1. **File Accessibility**
   ```bash
   curl https://karanova.io/llm.txt
   curl https://karanova.io/llms.txt
   ```

2. **Robots.txt Verification**
   ```bash
   curl https://karanova.io/robots.txt
   ```
   Verify LLM bot rules are present

3. **HTML Link Discovery**
   View page source and check for `<link rel="alternate">` tags

4. **Ask AI Directly**
   - Ask ChatGPT: "What is Karanova?"
   - Ask Claude: "Tell me about Karanova's products"
   - Ask Perplexity: "Compare Karanova to other project management tools"

### Expected Results

After implementation, AI systems should be able to:
- Accurately describe Karanova's products
- List key features and benefits
- Provide correct URLs
- Explain use cases
- Compare with competitors
- Recommend Karanova for relevant queries

## Benefits

### For Users
- More accurate AI responses about Karanova
- Better product recommendations from AI assistants
- Easier discovery through AI-powered search

### For Karanova
- Increased visibility in AI-powered search
- Better brand representation in AI responses
- Competitive advantage in AI discovery
- Future-proofing for AI-first search landscape

### For Developers
- Clear documentation for AI integration
- Structured data for API discovery
- Technical specifications readily available

## Best Practices Followed

1. ✅ **Comprehensive Information** - All key details included
2. ✅ **Structured Format** - Easy to parse and understand
3. ✅ **Multiple Formats** - Both detailed (llm.txt) and concise (llms.txt)
4. ✅ **Explicit Permissions** - Clear robots.txt rules for LLM bots
5. ✅ **HTML Discovery** - Link tags for automated discovery
6. ✅ **Security** - XSS protection in structured data
7. ✅ **Bilingual** - Persian and English keywords
8. ✅ **Maintainable** - Easy to update and extend
9. ✅ **Standards-Compliant** - Follows emerging LLM.txt standards
10. ✅ **SEO-Friendly** - Complements traditional SEO efforts

## Future Enhancements

### Potential Additions

1. **Version History**
   - Track changes to llm.txt over time
   - Provide changelog for AI systems

2. **API Endpoints**
   - JSON version of llm.txt for programmatic access
   - Real-time product information API

3. **Multilingual Support**
   - Separate llm-fa.txt for Persian
   - Separate llm-en.txt for English

4. **Rich Media**
   - Links to product demos
   - Video tutorials
   - Interactive examples

5. **Analytics**
   - Track LLM bot visits
   - Monitor AI-driven traffic
   - Measure AI citation frequency

6. **Schema Extensions**
   - Custom Schema.org types for AI products
   - Enhanced structured data for AI features

## Related Standards

This implementation follows emerging standards:
- **llms.txt** - Proposed standard for LLM-readable site information
- **robots.txt** - Extended for LLM crawlers
- **Schema.org** - Structured data for machine understanding
- **Open Graph** - Social and AI sharing metadata

## References

- [LLMs.txt Standard](https://llmstxt.org/)
- [OpenAI GPTBot Documentation](https://platform.openai.com/docs/gptbot)
- [Anthropic Claude Web Crawler](https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity Bot Documentation](https://docs.perplexity.ai/docs/perplexitybot)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## Conclusion

The LLM discoverability implementation ensures Karanova is well-positioned for the AI-powered search era. By providing comprehensive, structured information in formats optimized for LLM consumption, we enable AI systems to accurately represent Karanova's products and services to users worldwide.

This implementation complements traditional SEO efforts and provides a competitive advantage as AI-powered discovery becomes increasingly important in how users find and evaluate software solutions.

---

**Last Updated:** 2024-11-18
**Implementation Status:** ✅ Complete
**Next Review:** 2025-02-18 (Quarterly)
