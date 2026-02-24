import { expect, test, describe } from "bun:test";
import { getTranslation, createTranslator, translations } from "./index";

describe("Translations", () => {
  describe("getTranslation", () => {
    test("should return correct translation for existing key in English", () => {
      const result = getTranslation("en", "common.submit");
      expect(result).toBe("Submit");
    });

    test("should return correct translation for existing key in Persian", () => {
      const result = getTranslation("fa", "common.submit");
      expect(result).toBe("ارسال");
    });

    test("should handle nested keys correctly", () => {
      const result = getTranslation("en", "careers.title");
      expect(result).toBe("Join Our Team");
    });

    test("should return key if translation is missing and no fallback provided", () => {
      const missingKey = "common.nonExistentKey";
      const result = getTranslation("en", missingKey);
      expect(result).toBe(missingKey);
    });

    test("should return fallback if translation is missing", () => {
      const missingKey = "common.nonExistentKey";
      const fallback = "Fallback Value";
      const result = getTranslation("en", missingKey, fallback);
      expect(result).toBe(fallback);
    });

    test("should return fallback if key resolves to an object instead of a string", () => {
      // "common" is an object in the translations map
      const objectKey = "common";
      const fallback = "Fallback Value";
      const result = getTranslation("en", objectKey, fallback);
      expect(result).toBe(fallback);
    });

    test("should return key if key resolves to an object and no fallback provided", () => {
      const objectKey = "common";
      const result = getTranslation("en", objectKey);
      expect(result).toBe(objectKey);
    });

    test("should handle deep nested keys that do not exist", () => {
      const deepMissingKey = "common.deeply.nested.missing.key";
      const result = getTranslation("en", deepMissingKey);
      expect(result).toBe(deepMissingKey);
    });

    test("should verify actual data consistency", () => {
      // Iterate through a few known keys to ensure the data structure hasn't regressed
      expect(translations.en.nav.home).toBe("Home");
      expect(translations.fa.nav.home).toBe("خانه");
    });
  });

  describe("createTranslator", () => {
    test("should create a translator function for a specific language", () => {
      const t = createTranslator("en");
      expect(typeof t).toBe("function");
      expect(t("common.submit")).toBe("Submit");
    });

    test("should respect language context in created translator", () => {
      const tEn = createTranslator("en");
      const tFa = createTranslator("fa");

      expect(tEn("common.submit")).toBe("Submit");
      expect(tFa("common.submit")).toBe("ارسال");
    });

    test("should support fallback in created translator", () => {
      const t = createTranslator("en");
      const fallback = "Fallback Value";
      expect(t("missing.key", fallback)).toBe(fallback);
    });
  });
});
