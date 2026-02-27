from playwright.sync_api import sync_playwright
import time

def verify_button_role():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Navigate to homepage
        try:
            print("Navigating to homepage...")
            page.goto("http://localhost:3000", timeout=60000)

            # Wait for any content to load
            print("Waiting for page load...")
            page.wait_for_load_state("networkidle")

            # Take a screenshot of the initial state
            page.screenshot(path="initial_load.png")
            print("Saved initial_load.png")

            # Try to find the nav container with a more generic selector first
            print("Looking for nav...")
            if page.locator("nav").count() > 0:
                print("Found <nav> element")

            # Wait for nav to be visible with increased timeout
            try:
                page.wait_for_selector(".card-nav-container", timeout=10000)
                print("Found .card-nav-container")
            except Exception as e:
                print(f"Could not find .card-nav-container: {e}")
                # Print page content to debug
                content = page.content()
                print(f"Page content length: {len(content)}")
                with open("page_content.html", "w") as f:
                    f.write(content)
                print("Saved page content to page_content.html")

            # Find the hamburger menu button
            # We look for a button with class "hamburger-menu"
            hamburger = page.locator("button.hamburger-menu")

            # Check if it exists and is a button
            if hamburger.count() > 0:
                print("Found hamburger menu button")

                # Check attributes
                type_attr = hamburger.get_attribute("type")
                role_attr = hamburger.get_attribute("role")

                print(f"Button type: {type_attr}")
                print(f"Button role: {role_attr} (should be None/null as it is implicit)")

                if type_attr == "button":
                    print("✅ Verification PASSED: Hamburger menu is a <button type='button'>")
                else:
                    print(f"❌ Verification FAILED: Expected type='button', got '{type_attr}'")

                # Take screenshot
                hamburger.screenshot(path="hamburger_button.png")
                print("Screenshot saved to hamburger_button.png")
            else:
                print("❌ Verification FAILED: Could not find button.hamburger-menu")

                # Debug: check if it's still a div
                div_hamburger = page.locator("div.hamburger-menu")
                if div_hamburger.count() > 0:
                    print("Found hamburger menu as DIV instead of BUTTON")
                else:
                    print("Could not find any element with class hamburger-menu")

        except Exception as e:
            print(f"Error during verification: {e}")
            page.screenshot(path="error_state.png")

        finally:
            browser.close()

if __name__ == "__main__":
    verify_button_role()
