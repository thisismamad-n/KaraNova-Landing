from playwright.sync_api import sync_playwright
import time

def verify_onboarding():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to Onboarding
        print("Navigating to onboarding page...")
        page.goto("http://localhost:3000/onboarding")

        # Wait for content to load
        page.wait_for_selector('h2:has-text("نوع فعالیت شما چیست؟")')

        print("Page loaded. Taking screenshot...")
        page.screenshot(path="verification/onboarding_initial.png")

        # Verify step 1 options are present
        assert page.is_visible("text=خدمات")
        assert page.is_visible("text=تولید")
        assert page.is_visible("text=تولید محتوا")
        assert page.is_visible("text=سایر")

        print("Step 1 options verified.")

        # Click on 'Services' to go to next step
        page.click("text=خدمات")

        # Wait for step 2
        page.wait_for_selector('h2:has-text("تیم شما چند نفره است؟")')

        print("Navigated to Step 2. Taking screenshot...")
        page.screenshot(path="verification/onboarding_step2.png")

        browser.close()

if __name__ == "__main__":
    # Wait for server to be ready
    time.sleep(5)
    verify_onboarding()
