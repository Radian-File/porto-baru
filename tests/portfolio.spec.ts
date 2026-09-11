import { expect, test } from "@playwright/test";

test("homepage communicates Ricky's role and opens the portfolio", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Full-stack developer." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore selected work/ })).toHaveAttribute("href", "/portfolio");
});

test("portfolio index exposes selected work and the persistent navigation", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { level: 1, name: /Selected systems/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /RRS Studio/ })).toHaveAttribute("href", "/work/rrs-web");
  await expect(page.getByRole("link", { name: "Portfolio", exact: true })).toHaveAttribute("aria-current", "page");
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
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Skip to content" })).toHaveCSS("outline-style", "solid");
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
  for (const route of ["/", "/portfolio"]) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test("unknown routes provide a clear way home", async ({ page }) => {
  await page.goto("/work/not-a-project");
  await expect(page.getByRole("heading", { name: "Nothing here." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
});
