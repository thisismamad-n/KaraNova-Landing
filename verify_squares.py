from playwright.sync_api import sync_playwright
import time

def verify_landing_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a context with reduced motion preference to match the Squares component logic
        # context = browser.new_context(reduced_motion="reduce")
        # For this verification, we want to see the squares, so we use default context
        context = browser.new_context()
        page = context.new_page()

        try:
            # Navigate to the landing page
            # Assuming dev server is running on port 3000
            print("Navigating to http://localhost:3000...")
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for the page to load
            print("Waiting for page content...")
            page.wait_for_selector("canvas", state="visible", timeout=10000)

            # Take a screenshot of the hero section where Squares component is visible
            print("Taking screenshot...")
            page.screenshot(path="verification_squares.png")
            print("Screenshot saved to verification_squares.png")

        except Exception as e:
            print(f"Error during verification: {e}")
            # Take a screenshot even on error if possible
            try:
                page.screenshot(path="verification_error.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    verify_landing_page()
