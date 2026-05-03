// Due to environment constraints with React and Bun's test runner,
// a minimal and isolated test suite was created that explicitly validates
// the underlying functional behavior of the LanguageContext provider
// avoiding heavy dependencies or complex DOM testing library setup.
import { describe, test, expect, mock, beforeEach, afterEach, spyOn } from "bun:test";

let capturedContextValue: any = null;

let currentStates: any[] = [];
let stateIndex = 0;
let effectCallbacks: any[] = [];

mock.module("react", () => {
  return {
    createContext: () => ({
      Provider: (props: any) => {
        return { type: "Provider", props };
      }
    }),
    useContext: (ctx: any) => capturedContextValue,
    useState: (init: any) => {
      const currentIndex = stateIndex;
      if (currentStates[currentIndex] === undefined) {
        currentStates[currentIndex] = typeof init === 'function' ? init() : init;
      }

      const setter = mock((newVal: any) => {
        currentStates[currentIndex] = typeof newVal === 'function'
          ? newVal(currentStates[currentIndex])
          : newVal;
      });

      stateIndex++;
      return [currentStates[currentIndex], setter];
    },
    useEffect: (cb: any, deps: any) => {
      effectCallbacks.push(cb);
    },
    useMemo: (cb: any) => cb(),
    useCallback: (cb: any) => cb,
    default: {
      createContext: () => ({
        Provider: (props: any) => {
          return { type: "Provider", props };
        }
      }),
      useContext: (ctx: any) => capturedContextValue,
      useState: (init: any) => {
        const currentIndex = stateIndex;
        if (currentStates[currentIndex] === undefined) {
          currentStates[currentIndex] = typeof init === 'function' ? init() : init;
        }

        const setter = mock((newVal: any) => {
          currentStates[currentIndex] = typeof newVal === 'function'
            ? newVal(currentStates[currentIndex])
            : newVal;
        });

        stateIndex++;
        return [currentStates[currentIndex], setter];
      },
      useEffect: (cb: any, deps: any) => {
        effectCallbacks.push(cb);
      },
      useMemo: (cb: any) => cb(),
      useCallback: (cb: any) => cb,
    }
  };
});

import { LanguageProvider, useLanguage } from "../lib/contexts/LanguageContext";

export function extractContext(providerElement: any) {
  return providerElement.props.value;
}

describe("LanguageContext", () => {
  let localStorageMock: any;
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    localStorageMock = {
      getItem: mock((key: string) => store[key] || null),
      setItem: mock((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: mock(() => {
        store = {};
      }),
    };

    Object.defineProperty(global, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    spyOn(global, 'setTimeout').mockImplementation((cb: any) => {
      cb();
      return 1 as any;
    });
    spyOn(global, 'clearTimeout').mockImplementation(() => {});

    // Reset mocks
    currentStates = [];
    stateIndex = 0;
    effectCallbacks = [];
    capturedContextValue = null;
  });

  afterEach(() => {
    mock.restore();
  });

  test("useLanguage throws error when used outside provider", () => {
    let error;
    try {
      capturedContextValue = undefined;
      useLanguage();
    } catch (e: any) {
      error = e;
    }
    expect(error).toBeDefined();
    expect(error.message).toBe("useLanguage must be used within a LanguageProvider");
  });

  test("LanguageProvider provides default language 'fa' and sets context", () => {
    const result = LanguageProvider({ children: "test" });
    const ctx = extractContext(result);

    expect(ctx).toBeDefined();
    expect(ctx.language).toBe("fa");
    expect(typeof ctx.setLanguage).toBe("function");
    expect(typeof ctx.t).toBe("function");
  });

  test("LanguageProvider effect loads 'en' from localStorage if present", () => {
    store["karanova-language"] = "en";
    LanguageProvider({ children: "test" });
    effectCallbacks[0]();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("karanova-language");

    // Test that the state was actually updated by forcing a re-render
    stateIndex = 0;
    const rerenderResult = LanguageProvider({ children: "test" });
    expect(extractContext(rerenderResult).language).toBe("en");
  });

  test("LanguageProvider effect loads 'fa' from localStorage if present", () => {
    store["karanova-language"] = "fa";
    LanguageProvider({ children: "test" });
    effectCallbacks[0]();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("karanova-language");

    stateIndex = 0;
    const rerenderResult = LanguageProvider({ children: "test" });
    expect(extractContext(rerenderResult).language).toBe("fa");
  });

  test("LanguageProvider effect defaults to 'fa' if localStorage is empty", () => {
    LanguageProvider({ children: "test" });
    effectCallbacks[0]();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("karanova-language");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("karanova-language", "fa");
  });

  test("LanguageProvider effect defaults to 'fa' if localStorage has invalid value", () => {
    store["karanova-language"] = "fr";
    LanguageProvider({ children: "test" });
    effectCallbacks[0]();
    expect(localStorageMock.getItem).toHaveBeenCalledWith("karanova-language");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("karanova-language", "fa");
  });

  test("LanguageProvider setLanguage updates state and localStorage", () => {
    const result = LanguageProvider({ children: "test" });
    const ctx = extractContext(result);
    ctx.setLanguage("en");
    expect(localStorageMock.setItem).toHaveBeenCalledWith("karanova-language", "en");

    stateIndex = 0;
    const rerenderResult = LanguageProvider({ children: "test" });
    expect(extractContext(rerenderResult).language).toBe("en");
  });

  test("LanguageProvider t function translates keys", () => {
    currentStates[0] = "en";
    let result = LanguageProvider({ children: "test" });
    let ctx = extractContext(result);
    expect(ctx.t("common.readMore")).toBe("Read More");

    stateIndex = 0;
    currentStates[0] = "fa";
    result = LanguageProvider({ children: "test" });
    ctx = extractContext(result);
    expect(ctx.t("common.readMore")).toBe("بیشتر بخوانید");
  });

  test("LanguageProvider t function uses fallback if key not found", () => {
    const result = LanguageProvider({ children: "test" });
    const ctx = extractContext(result);
    expect(ctx.t("non.existent.key", "My Fallback")).toBe("My Fallback");
  });

  test("LanguageProvider t function returns key if no fallback and key not found", () => {
    const result = LanguageProvider({ children: "test" });
    const ctx = extractContext(result);
    expect(ctx.t("non.existent.key")).toBe("non.existent.key");
  });

  test("useLanguage hook returns context when used inside provider", () => {
    const result = LanguageProvider({ children: "test" });
    capturedContextValue = extractContext(result);
    const context = useLanguage();
    expect(context).toBeDefined();
    expect(context.language).toBe("fa");
    expect(typeof context.setLanguage).toBe("function");
    expect(typeof context.t).toBe("function");
  });
});
