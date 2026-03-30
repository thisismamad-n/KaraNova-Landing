import { describe, test, expect, mock } from "bun:test";
import type { DocArticle } from "./docs";

// Create mock data
const mockArticles: DocArticle[] = [
  {
    id: "doc1",
    slug: "doc-1",
    title: "Introduction to Karanova",
    category: "getting-started",
    content: "Welcome to Karanova! This is the introduction.",
    order: 1,
    lastUpdated: new Date("2024-01-01"),
    relatedArticles: [],
    searchKeywords: ["intro", "start", "welcome"],
  },
  {
    id: "doc2",
    slug: "doc-2",
    title: "Advanced Dashboard Usage",
    category: "advanced",
    content: "Learn how to use the dashboard effectively. We cover widgets and analytics.",
    order: 2,
    lastUpdated: new Date("2024-01-02"),
    relatedArticles: [],
    searchKeywords: ["dashboard", "analytics", "widgets"],
  },
  {
    id: "doc3",
    slug: "doc-3",
    title: "API Reference",
    category: "developers",
    content: "Detailed API documentation for developers to integrate with our system.",
    order: 3,
    lastUpdated: new Date("2024-01-03"),
    relatedArticles: [],
    searchKeywords: ["api", "endpoints", "developers", "system"],
  },
  {
    id: "doc4",
    slug: "doc-4",
    title: "Getting Started with AI",
    category: "getting-started",
    content: "AI features are a core part of the system. Let's see how they work.",
    order: 4,
    lastUpdated: new Date("2024-01-04"),
    relatedArticles: [],
    searchKeywords: ["ai", "artificial intelligence"],
  }
];

mock.module("./docs", () => {
  const original = import.meta.require("./docs");
  return {
    ...original,
    docArticles: mockArticles
  };
});

// Import the function we want to test after mocking the module
import { searchDocs } from "./docs";

describe("searchDocs", () => {
  test("returns empty array for non-matching query", () => {
    const results = searchDocs("xyznonexistent");
    expect(results).toHaveLength(0);
  });

  test("matches by title (case-insensitive)", () => {
    const results = searchDocs("aDvAnCeD");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("doc2");

    const results2 = searchDocs("introduction");
    expect(results2).toHaveLength(1);
    expect(results2[0].id).toBe("doc1");
  });

  test("matches by content (case-insensitive)", () => {
    const results = searchDocs("widgets and ANALYTICS");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("doc2");

    const results2 = searchDocs("integrate with our system");
    expect(results2).toHaveLength(1);
    expect(results2[0].id).toBe("doc3");
  });

  test("matches by search keywords (case-insensitive)", () => {
    const results = searchDocs("endpoints");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("doc3");

    const results2 = searchDocs("ARTIFICIAL");
    expect(results2).toHaveLength(1);
    expect(results2[0].id).toBe("doc4");
  });

  test("returns multiple articles if query matches in different fields", () => {
    // "system" matches in doc3 content/keywords and doc4 content
    const results = searchDocs("system");
    expect(results).toHaveLength(2);
    expect(results.map(r => r.id)).toContain("doc3");
    expect(results.map(r => r.id)).toContain("doc4");

    // "introduction" matches doc1 title and content
    const results2 = searchDocs("introduction");
    expect(results2).toHaveLength(1);
    expect(results2[0].id).toBe("doc1");
  });

  test("returns all articles when query is empty", () => {
    const results = searchDocs("");
    expect(results).toHaveLength(4);
  });

  test("handles partial matches", () => {
    // "dash" matches "Dashboard" in doc2 title and "dashboard" in doc2 keywords
    const results = searchDocs("dash");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("doc2");

    // "dev" matches "developers" in doc3 category, but category is NOT searched!
    // It should match doc3 because "developers" is in the content and keywords.
    const results2 = searchDocs("dev");
    expect(results2).toHaveLength(1);
    expect(results2[0].id).toBe("doc3");
  });
});
