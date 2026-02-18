import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import NetworkError from "./NetworkError";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock lucide-react
vi.mock("lucide-react", () => ({
  WifiOff: () => <div data-testid="wifi-off-icon" />,
  RefreshCw: () => <div data-testid="refresh-icon" />,
}));

describe("NetworkError", () => {
  it("renders with the default message", () => {
    render(<NetworkError />);
    expect(screen.getByText("مشکل در اتصال")).toBeDefined();
    expect(screen.getByText("خطا در اتصال به شبکه")).toBeDefined();
  });

  it("renders with a custom message", () => {
    const customMessage = "Custom error message";
    render(<NetworkError message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeDefined();
  });

  it("renders the retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<NetworkError onRetry={onRetry} />);
    const retryButton = screen.getByText("تلاش مجدد");
    expect(retryButton).toBeDefined();

    fireEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("does not render the retry button when onRetry is not provided", () => {
    render(<NetworkError />);
    expect(screen.queryByText("تلاش مجدد")).toBeNull();
  });

  it("applies custom className", () => {
    const { container } = render(<NetworkError className="custom-class" />);
    const div = container.firstChild as HTMLElement;
    expect(div.className).toContain("custom-class");
  });

  it("has correct structural elements", () => {
    render(<NetworkError />);
    expect(screen.getByTestId("wifi-off-icon")).toBeDefined();
  });
});
