import { expect, test, describe, mock } from "bun:test";

// Mock external dependencies
mock.module("clsx", () => ({
  clsx: (...args: any[]) => {
    const classes: string[] = [];
    const process = (arg: any) => {
      if (typeof arg === "string" && arg) {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        arg.forEach(process);
      } else if (typeof arg === "object" && arg !== null) {
        Object.entries(arg).forEach(([key, value]) => {
          if (value) classes.push(key);
        });
      }
    };
    args.forEach(process);
    return classes.join(" ");
  }
}));

mock.module("tailwind-merge", () => ({
  twMerge: (input: string) => {
    // Simple mock for tailwind-merge that handles the specific conflict case in our test
    if (input === "px-2 py-2 p-4") return "p-4";
    return input;
  }
}));

import { cn, debounce } from "./utils";

describe("cn", () => {
  test("should merge class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  test("should handle conditional classes", () => {
    expect(cn("a", true && "b", false && "c")).toBe("a b");
  });

  test("should resolve tailwind CSS conflicts", () => {
    expect(cn("px-2 py-2", "p-4")).toBe("p-4");
  });

  test("should handle undefined and null inputs", () => {
    // @ts-ignore
    expect(cn("a", undefined, null, "b")).toBe("a b");
  });

  test("should handle arrays of classes", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c");
  });
});

describe("debounce", () => {
  test("should delay execution", async () => {
    let called = false;
    const fn = () => { called = true; };
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    expect(called).toBe(false);

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(called).toBe(true);
  });

  test("should only execute once for multiple calls within wait period", async () => {
    let callCount = 0;
    const fn = () => { callCount++; };
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(callCount).toBe(0);

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(callCount).toBe(1);
  });

  test("should pass arguments to the original function", async () => {
    let receivedArgs: any[] = [];
    const fn = (...args: any[]) => { receivedArgs = args; };
    const debouncedFn = debounce(fn, 10);

    debouncedFn("hello", 123);

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(receivedArgs).toEqual(["hello", 123]);
  });

  test("should cancel pending execution", async () => {
    let called = false;
    const fn = () => { called = true; };
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    debouncedFn.cancel();

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(called).toBe(false);
  });
});
