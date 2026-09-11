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
  await expect(page.locator(".system-core-visual")).toHaveAttribute("data-state", "portfolio");
});

test("About and Portfolio expose distinct Core compositions", async ({ page }) => {
  await page.goto("/about");
  const core = page.locator(".system-core-visual");
  await expect(core).toHaveAttribute("data-state", "about");
  const aboutLightSize = await core.evaluate((element) => getComputedStyle(element).getPropertyValue("--core-light-size").trim());

  await page.getByRole("link", { name: "Portfolio", exact: true }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(core).toHaveAttribute("data-state", "portfolio");
  const portfolioLightSize = await core.evaluate((element) => getComputedStyle(element).getPropertyValue("--core-light-size").trim());

  expect(aboutLightSize).toBe("17%");
  expect(portfolioLightSize).toBe("11%");
});

test("the same System Core persists through a portal transition", async ({ page }) => {
  await page.goto("/");
  const canvas = page.locator(".system-core-visual canvas");
  await expect(canvas).toBeVisible();
  await canvas.evaluate((element) => { element.dataset.persistenceToken = "same-core"; });

  await page.getByRole("link", { name: /Explore selected work/ }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page.locator(".portfolio-shell")).toHaveAttribute("data-route", "portfolio");
  await expect(page.locator(".system-core-visual canvas")).toHaveAttribute("data-persistence-token", "same-core");
  await expect(page.locator("main#main-content")).toBeFocused();
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
  await page.getByRole("link", { name: /Explore selected work/ }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await context.close();
});

test("mobile layout does not overflow horizontally", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/portfolio"]) {
    await page.goto(route);
    const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
    expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.locator(".system-core-visual")).toHaveAttribute("data-quality", "low");
  }
});

test("unknown routes provide a clear way home", async ({ page }) => {
  await page.goto("/work/not-a-project");
  await expect(page.getByRole("heading", { name: "Nothing here." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/");
});
