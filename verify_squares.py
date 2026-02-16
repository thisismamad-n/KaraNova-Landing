from playwright.sync_api import sync_playwright
import time

def run():
    print("Starting Playwright...")
    with sync_playwright() as p:
        print("Launching browser...")
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1920, 'height': 1080})

        # Navigate to home page
        print("Navigating to http://localhost:3000")
        try:
            page.goto("http://localhost:3000", timeout=30000)

            # Wait for page to load - networkidle might timeout if there are pending requests, so domcontentloaded is safer for first load
            page.wait_for_load_state("domcontentloaded")
            print("DOM loaded.")

            # Wait a bit for animations and JS hydration
            time.sleep(3)

            # Take screenshot
            print("Taking screenshot...")
            page.screenshot(path="verification_squares.png")
            print("Screenshot saved to verification_squares.png")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_screenshot.png")
        finally:
            browser.close()
            print("Browser closed.")

if __name__ == "__main__":
    run()
