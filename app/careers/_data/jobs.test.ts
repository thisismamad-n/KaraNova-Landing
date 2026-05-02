import { describe, test, expect } from "bun:test";
import { getJobBySlug, mockJobs } from "./jobs";

describe("getJobBySlug", () => {
  test("returns the correct job for an existing slug", () => {
    // We use the first actual job from the mock data to ensure predictability
    // even if the mock data changes
    const targetJob = mockJobs[0];
    const job = getJobBySlug(targetJob.slug);

    expect(job).toBeDefined();
    expect(job?.id).toBe(targetJob.id);
    expect(job?.title).toBe(targetJob.title);
  });

  test("returns undefined for a non-existing slug", () => {
    const job = getJobBySlug("non-existing-job-slug-12345");
    expect(job).toBeUndefined();
  });

  test("returns the correct job for another existing slug", () => {
    // We use the second job to ensure it's not just returning the first one
    if (mockJobs.length > 1) {
      const targetJob = mockJobs[1];
      const job = getJobBySlug(targetJob.slug);

      expect(job).toBeDefined();
      expect(job?.id).toBe(targetJob.id);
      expect(job?.title).toBe(targetJob.title);
    }
  });

  test("returns undefined for empty string", () => {
    const job = getJobBySlug("");
    expect(job).toBeUndefined();
  });

  test("returns undefined for null or undefined input", () => {
    // @ts-expect-error - Testing invalid input
    expect(getJobBySlug(null)).toBeUndefined();
    // @ts-expect-error - Testing invalid input
    expect(getJobBySlug(undefined)).toBeUndefined();
  });
});
