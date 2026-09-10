import { expect, test } from "@playwright/test";

test("homepage communicates role and exposes selected work", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Full-stack developer." })).toBeVisible();
  await expect(page.getByRole("link", { name: /RRS Studio/ })).toHaveAttribute("href", "/work/rrs-web");
});

test("project route presents evidence and source", async ({ page }) => {
  await page.goto("/work/rrs-web");
  await expect(page.getByRole("heading", { level: 1, name: "RRS Studio" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Documented decisions" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Inspect source repository/ })).toHaveAttribute("href", "https://github.com/Radian-File/rrs-web");
});

test("keyboard focus is visible on the first navigation link", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Ricky, back to top" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Ricky, back to top" })).toHaveCSS("outline-style", "solid");
});

test("reduced motion preserves readable content", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await context.close();
});

test("mobile layout does not overflow horizontally", async ({ page }) => {
  await page.goto("/");
  const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});
