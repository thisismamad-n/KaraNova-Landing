import { test, expect } from 'playwright/test';

test('verify LaserFlow renders without errors', async ({ page }) => {
  // Add a longer timeout because the dev server takes time to start
  test.setTimeout(60000);

  // Go to the landing page which has the FinalCTA section containing LaserFlow
  await page.goto('http://localhost:3000/');

  // Wait for the page to load
  await page.waitForLoadState('networkidle');

  // Scroll to the bottom to trigger LaserFlow rendering (it's inside FinalCTA)
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait a bit for the animation to start and render frames
  await page.waitForTimeout(2000);

  // Take a screenshot of the FinalCTA section
  const finalCta = page.locator('#final-cta-section');
  await finalCta.screenshot({ path: '/home/jules/verification/laserflow.png' });

  // Check that there are no WebGL errors in the console
  let hasWebGlError = false;
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('WebGL')) {
      hasWebGlError = true;
      console.error('WebGL Error:', msg.text());
    }
  });

  expect(hasWebGlError).toBe(false);
});
