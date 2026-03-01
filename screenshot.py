import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Set the viewport to mobile device proportions as the optimized paths are for mobile layout
        page = await browser.new_page(viewport={"width": 375, "height": 812})
        await page.goto("http://localhost:3000/landing")
        await page.wait_for_selector("body", timeout=60000)
        # Give it a moment to render
        await page.wait_for_timeout(2000)
        await page.screenshot(path="screenshot_mobile.png", full_page=True)
        await browser.close()

asyncio.run(run())
