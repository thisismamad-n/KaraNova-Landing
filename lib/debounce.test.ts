import { expect, test, describe, mock, beforeEach, afterEach } from "bun:test";
import { debounce } from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    mock.restore();
  });

  test("should execute after the specified wait time", async () => {
    const fn = mock(() => {});
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    expect(fn).not.toHaveBeenCalled();

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should only execute once if called multiple times within wait period", async () => {
    const fn = mock(() => {});
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("should pass correct arguments to the original function", async () => {
    const fn = mock((_a: string, _b: number) => {});
    const debouncedFn = debounce(fn, 10);

    debouncedFn("hello", 42);

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fn).toHaveBeenCalledWith("hello", 42);
  });

  test("should cancel the pending execution when cancel is called", async () => {
    const fn = mock(() => {});
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    debouncedFn.cancel();

    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fn).not.toHaveBeenCalled();
  });

  test("should execute again if called after the wait period", async () => {
    const fn = mock(() => {});
    const debouncedFn = debounce(fn, 10);

    debouncedFn();
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fn).toHaveBeenCalledTimes(1);

    debouncedFn();
    await new Promise((resolve) => setTimeout(resolve, 20));
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
