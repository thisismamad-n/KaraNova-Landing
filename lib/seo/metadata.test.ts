import { expect, test, describe } from "bun:test";
import {
  generatePageMetadata,
  generateBlogMetadata,
  generateOrganizationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateProductSchema,
  generateArticleSchema,
  generateJobPostingSchema,
} from "./metadata";

describe("generatePageMetadata", () => {
  const baseConfig = {
    title: "Test Page",
    description: "Test Description",
  };

  test("should generate basic metadata with default values", () => {
    const metadata = generatePageMetadata(baseConfig);

    expect(metadata.title).toBe("Test Page | Karanova - کارانوا");
    expect(metadata.description).toBe("Test Description");
    expect(metadata.keywords).toBe("");
    expect(metadata.openGraph?.images).toEqual([
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Test Page",
      },
    ]);
  });

  test("should handle keywords array", () => {
    const metadata = generatePageMetadata({
      ...baseConfig,
      keywords: ["tech", "ai", "business"],
    });

    expect(metadata.keywords).toBe("tech, ai, business");
  });

  test("should handle custom OG image", () => {
    const metadata = generatePageMetadata({
      ...baseConfig,
      ogImage: "/custom-og.jpg",
    });

    // @ts-ignore - access nested property
    expect(metadata.openGraph.images[0].url).toBe("/custom-og.jpg");
    // @ts-ignore
    expect(metadata.twitter.images).toEqual(["/custom-og.jpg"]);
  });

  test("should handle Persian language and locales", () => {
    const metadata = generatePageMetadata({
      ...baseConfig,
      language: "fa",
    });

    // @ts-ignore
    expect(metadata.openGraph.locale).toBe("fa_IR");
    // @ts-ignore
    expect(metadata.openGraph.alternateLocale).toBe("en_US");
  });

  test("should handle English language (default) locales", () => {
    const metadata = generatePageMetadata(baseConfig);

    // @ts-ignore
    expect(metadata.openGraph.locale).toBe("en_US");
    // @ts-ignore
    expect(metadata.openGraph.alternateLocale).toBe("fa_IR");
  });

  test("should handle canonical URL and alternates", () => {
    const canonical = "https://karanova.io/services/ai";
    const metadata = generatePageMetadata({
      ...baseConfig,
      canonical,
    });

    expect(metadata.alternates?.canonical).toBe(canonical);
    // @ts-ignore
    expect(metadata.alternates.languages.en).toBe("https://karanova.io/en/services/ai");
    // @ts-ignore
    expect(metadata.alternates.languages.fa).toBe("https://karanova.io/fa/services/ai");
  });

  test("should handle robots noIndex", () => {
    const metadata = generatePageMetadata({
      ...baseConfig,
      noIndex: true,
    });

    // @ts-ignore
    expect(metadata.robots.index).toBe(false);
    // @ts-ignore
    expect(metadata.robots.follow).toBe(false);
  });

  test("should handle robots index (default)", () => {
    const metadata = generatePageMetadata(baseConfig);

    // @ts-ignore
    expect(metadata.robots.index).toBe(true);
    // @ts-ignore
    expect(metadata.robots.googleBot.index).toBe(true);
  });

  test("should handle lastModified", () => {
    const date = new Date("2023-10-27T10:00:00Z");
    const metadata = generatePageMetadata({
      ...baseConfig,
      lastModified: date,
    });

    expect(metadata.other?.["last-modified"]).toBe(date.toISOString());
  });
});

describe("generateBlogMetadata", () => {
  const blogConfig = {
    title: "Blog Post",
    description: "Post Description",
    author: "Jane Doe",
    publishedDate: new Date("2023-01-01T12:00:00Z"),
    tags: ["nextjs", "react"],
  };

  test("should generate blog-specific metadata", () => {
    const metadata = generateBlogMetadata(blogConfig);

    expect(metadata.authors).toEqual([{ name: "Jane Doe" }]);
    // @ts-ignore
    expect(metadata.openGraph.type).toBe("article");
    // @ts-ignore
    expect(metadata.openGraph.publishedTime).toBe(blogConfig.publishedDate.toISOString());
    // @ts-ignore
    expect(metadata.openGraph.authors).toEqual(["Jane Doe"]);
    // @ts-ignore
    expect(metadata.openGraph.tags).toEqual(["nextjs", "react"]);
  });

  test("should handle modifiedDate in blog metadata", () => {
    const modifiedDate = new Date("2023-01-02T12:00:00Z");
    const metadata = generateBlogMetadata({
      ...blogConfig,
      modifiedDate,
    });

    // @ts-ignore
    expect(metadata.openGraph.modifiedTime).toBe(modifiedDate.toISOString());
    expect(metadata.other?.["last-modified"]).toBe(modifiedDate.toISOString());
  });

  test("should handle missing optional fields with defaults", () => {
    const minimalConfig = {
      title: "Minimal Post",
      description: "Minimal Description",
      author: "John Doe",
      publishedDate: new Date("2023-01-01T12:00:00Z"),
    };
    const metadata = generateBlogMetadata(minimalConfig);

    // @ts-ignore
    expect(metadata.openGraph.tags).toEqual([]);
    // @ts-ignore
    expect(metadata.openGraph.images[0].url).toBe("/og-default.jpg");
    // @ts-ignore
    expect(metadata.twitter.images[0]).toBe("/og-default.jpg");
  });

  test("should use publishedDate for last-modified when modifiedDate is not provided", () => {
    const date = new Date("2023-01-01T12:00:00Z");
    const metadata = generateBlogMetadata({
      title: "No Modified Date",
      description: "Desc",
      author: "John Doe",
      publishedDate: date,
    });

    expect(metadata.other?.["last-modified"]).toBe(date.toISOString());
    // @ts-ignore
    expect(metadata.openGraph.modifiedTime).toBeUndefined();
  });

  test("should correctly handle custom featuredImage", () => {
    const customImage = "/custom-blog-image.jpg";
    const metadata = generateBlogMetadata({
      title: "Custom Image",
      description: "Desc",
      author: "John Doe",
      publishedDate: new Date("2023-01-01T12:00:00Z"),
      featuredImage: customImage,
    });

    // @ts-ignore
    expect(metadata.openGraph.images[0].url).toBe(customImage);
    // @ts-ignore
    expect(metadata.twitter.images[0]).toBe(customImage);
  });

  test("should handle canonical URL", () => {
    const canonical = "https://karanova.io/blog/custom-canonical";
    const metadata = generateBlogMetadata({
      title: "Canonical Post",
      description: "Desc",
      author: "John Doe",
      publishedDate: new Date("2023-01-01T12:00:00Z"),
      canonical,
    });

    expect(metadata.alternates?.canonical).toBe(canonical);
  });
});

describe("Schema Generators", () => {
  test("generateOrganizationSchema returns correct structure", () => {
    const schema = generateOrganizationSchema();
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("Karanova");
    expect(Array.isArray(schema.sameAs)).toBe(true);
  });

  test("generateBreadcrumbSchema returns correct structure", () => {
    const items = [
      { name: "Home", url: "https://karanova.io" },
      { name: "Blog", url: "https://karanova.io/blog" },
    ];
    const schema = generateBreadcrumbSchema(items);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0].name).toBe("Home");
    expect(schema.itemListElement[1].position).toBe(2);
  });

  test("generateFAQSchema returns correct structure", () => {
    const faqs = [
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" },
    ];
    const schema = generateFAQSchema(faqs);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0].name).toBe("Q1");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("A1");
  });

  test("generateFAQSchema handles empty array", () => {
    const schema = generateFAQSchema([]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(0);
  });

  test("generateFAQSchema handles special characters and HTML", () => {
    const faqs = [
      { question: "What is <strong>HTML</strong>?", answer: "It's a markup language & more!" },
    ];
    const schema = generateFAQSchema(faqs);
    expect(schema.mainEntity[0].name).toBe("What is <strong>HTML</strong>?");
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("It's a markup language & more!");
  });

  test("generateFAQSchema handles null or undefined runtime inputs", () => {
    // @ts-ignore - intentional runtime test
    expect(() => generateFAQSchema(null)).toThrow(TypeError);
    // @ts-ignore - intentional runtime test
    expect(() => generateFAQSchema(undefined)).toThrow(TypeError);
  });

  test("generateProductSchema returns correct structure", () => {
    const config = {
      name: "AI Suite",
      description: "AI Tools",
      url: "https://karanova.io/ai",
      offers: { price: "100", priceCurrency: "USD" },
    };
    const schema = generateProductSchema(config);
    expect(schema["@type"]).toBe("SoftwareApplication");
    expect(schema.name).toBe("AI Suite");
    expect(schema.offers?.price).toBe("100");
  });

  test("generateArticleSchema returns correct structure", () => {
    const date = new Date("2023-01-01");
    const config = {
      title: "Article Title",
      description: "Article Desc",
      url: "https://karanova.io/article",
      author: "John",
      publishedDate: date,
    };
    const schema = generateArticleSchema(config);
    expect(schema["@type"]).toBe("Article");
    expect(schema.headline).toBe("Article Title");
    expect(schema.datePublished).toBe(date.toISOString());
  });

  test("generateJobPostingSchema returns correct structure", () => {
    const date = new Date("2023-01-01");
    const config = {
      title: "Developer",
      description: "Coding job",
      url: "https://karanova.io/jobs/1",
      datePosted: date,
      employmentType: "FULL_TIME",
      location: "Tehran",
    };
    const schema = generateJobPostingSchema(config);
    expect(schema["@type"]).toBe("JobPosting");
    expect(schema.title).toBe("Developer");
    expect(schema.jobLocation.address.addressLocality).toBe("Tehran");
  });
});
