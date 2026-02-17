from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            print("Navigating to home page...")
            page.goto("http://localhost:3000")

            # Scroll down to make StickyHeader visible
            print("Scrolling down...")
            page.evaluate("window.scrollTo(0, 1000)")
            page.wait_for_timeout(2000) # Wait for scroll and animation

            # Locate the CTA button in the header
            print("Locating CTA button...")
            cta = page.locator("a.card-nav-cta-button")
            cta.wait_for(state="visible", timeout=10000)

            # Check if it is an anchor tag
            tag_name = cta.evaluate("el => el.tagName")
            print(f"Tag name: {tag_name}")
            assert tag_name == "A", f"Expected tag name A, got {tag_name}"

            # Check if it contains a button (it shouldn't anymore)
            has_button = cta.locator("button").count()
            print(f"Nested buttons: {has_button}")
            assert has_button == 0, "Found nested button inside anchor!"

            # Take a screenshot of the header
            print("Taking screenshot...")
            header = page.locator(".card-nav-container")
            header.screenshot(path="verification/header_cta.png")
            print("Screenshot saved to verification/header_cta.png")

        except Exception as e:
            print(f"Error: {e}")
            try:
                page.screenshot(path="verification/error.png")
            except:
                pass
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()
