import { describe, test, expect } from "bun:test";
import { getDocsByCategory, docArticles } from "./docs";

describe("getDocsByCategory", () => {
  test("returns articles for a matching category", () => {
    // We use the actual docArticles from the module
    const results = getDocsByCategory("getting-started");

    // Check if the results only contain articles from the correct category
    const allMatch = results.every(doc => doc.category === "getting-started");
    expect(allMatch).toBe(true);

    // Check if it returns the expected number of articles
    const expectedCount = docArticles.filter(doc => doc.category === "getting-started").length;
    expect(results).toHaveLength(expectedCount);
  });

  test("returns articles sorted by their order property", () => {
    const results = getDocsByCategory("getting-started");

    // If there's more than one article, check the sorting
    if (results.length > 1) {
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i].order).toBeLessThanOrEqual(results[i + 1].order);
      }
    } else {
      expect(true).toBe(true); // Dummy assertion
    }
  });

  test("returns empty array for a non-matching category", () => {
    const results = getDocsByCategory("non-existent-category");
    expect(results).toHaveLength(0);
  });

  test("returns empty array for an empty string input", () => {
    const results = getDocsByCategory("");
    expect(results).toHaveLength(0);
  });

  test("handles unexpected runtime inputs gracefully", () => {
    // @ts-expect-error - testing unexpected runtime inputs
    const resultsNull = getDocsByCategory(null);
    expect(resultsNull).toHaveLength(0);

    // @ts-expect-error - testing unexpected runtime inputs
    const resultsUndefined = getDocsByCategory(undefined);
    expect(resultsUndefined).toHaveLength(0);
  });
});
