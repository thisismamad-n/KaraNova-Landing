from playwright.sync_api import sync_playwright
import time

def verify_onboarding(page):
    print("Navigating to onboarding...")
    page.goto("http://localhost:3000/onboarding")
    page.wait_for_selector("text=نوع فعالیت شما چیست؟")

    # Step 1: Verify focus on OptionCard
    print("Verifying Step 1 focus...")
    # First tab might focus skip link or body, try focusing specifically
    page.locator("button").first.focus()
    page.wait_for_timeout(500) # Wait for focus transition
    page.screenshot(path="verification/step1_focus.png")

    # Select first option to proceed
    print("Proceeding to Step 2...")
    page.click("button >> text=خدمات")
    page.wait_for_timeout(1000) # Wait for transition

    # Step 2: Size
    print("Proceeding to Step 3...")
    page.click("button >> text=تک نفره")
    page.wait_for_timeout(1000)

    # Step 3: Style
    print("Proceeding to Step 4...")
    page.click("button >> text=آنلاین")
    page.wait_for_timeout(1000)

    # Step 4: Age
    print("Proceeding to Step 5...")
    page.click("button >> text=تازه‌تاسیس")
    page.wait_for_timeout(1000)

    # Step 5: Info
    print("Verifying Step 5 (Info) focus...")
    page.wait_for_selector("textarea")
    page.focus("textarea")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/step5_focus.png")

    print("Proceeding to Step 6 (Auth)...")
    page.click("button >> text=ادامه به احراز هویت")
    page.wait_for_timeout(1000)

    # Step 6: Auth
    print("Verifying Step 6 (Auth) input focus...")
    # By default login is selected, so email is visible
    page.wait_for_selector("input[type='email']")
    page.focus("input[type='email']")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/step6_input_focus.png")

    # Check toggle focus
    print("Verifying Step 6 (Auth) toggle focus...")
    page.focus("button >> text=ثبت‌نام")
    page.wait_for_timeout(500)
    page.screenshot(path="verification/step6_toggle_focus.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_onboarding(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
