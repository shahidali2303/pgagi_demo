import { test, expect } from "@playwright/test";

test.describe("PGAGI DEMO E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await page.evaluate(() => {
      window.localStorage.setItem(
        "persist:root",
        JSON.stringify({
          ui: JSON.stringify({
            isDarkMode: false,
            isSidebarOpen: true,
            searchQuery: "",
            toasts: [],
          }),
          preferences: JSON.stringify({
            selectedCategories: ["technology", "entertainment"],
          }),
          favorites: JSON.stringify({ items: [] }),
          auth: JSON.stringify({ isAuthenticated: true, userName: "TestUser" }),
          _persist: JSON.stringify({ version: 1, rehydrated: true }),
        }),
      );
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
  });

  test("1. should have the correct page title and layout", async ({ page }) => {
    await expect(page).toHaveTitle(/Personalized Content Dashboard/);
    await expect(page.getByRole("link", { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /settings/i })).toBeVisible();
  });

  test("2. should toggle dark mode and persist it", async ({ page }) => {
    const html = page.locator("html");

    await expect(html).not.toHaveClass(/dark/);

    await page.getByRole("button", { name: /toggle dark mode/i }).click();

    await page.waitForTimeout(500);

    await expect(html).toHaveClass(/dark/);

    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(html).toHaveClass(/dark/);
  });

  test("3. should filter content when using the search bar", async ({
    page,
  }) => {
    await page.waitForSelector("h3", { state: "visible", timeout: 10000 });

    const searchInput = page.getByPlaceholder(/search news, movies, or posts/i);
    await searchInput.fill("Space");

    await page.waitForTimeout(1000);

    await expect(page.getByText(/matching "Space"/i)).toBeVisible();
  });

  test("4. should allow drag-and-drop reordering of cards", async ({
    page,
  }) => {
    await page.waitForSelector("h3", { state: "visible", timeout: 10000 });

    const firstCardTitle = await page.locator("h3").first().textContent();

    const dragHandle = page.locator('[title="Drag to reorder"]').first();
    await expect(dragHandle).toBeVisible();

    const secondCard = page.locator(".group\\/card").nth(1);

    const sourceBox = await dragHandle.boundingBox();
    const targetBox = await secondCard.boundingBox();
    if (!sourceBox || !targetBox)
      throw new Error("Could not get bounding boxes");

    const startX = sourceBox.x + sourceBox.width / 2;
    const startY = sourceBox.y + sourceBox.height / 2;
    const endX = targetBox.x + targetBox.width / 2;
    const endY = targetBox.y + targetBox.height / 2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();

    await page.mouse.move(startX + 5, startY + 5, { steps: 5 });
    await page.waitForTimeout(100);

    await page.mouse.move(endX, endY, { steps: 15 });
    await page.waitForTimeout(100);
    await page.mouse.up();

    await page.waitForTimeout(1000);

    const newFirstCardTitle = await page.locator("h3").first().textContent();
    expect(newFirstCardTitle).not.toBe(firstCardTitle);
  });

  test("5. should show login screen, allow login, and handle logout", async ({
    page,
  }) => {
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();
    await page.waitForLoadState("networkidle");

    await page.waitForLoadState("networkidle");

    await expect(
      page.getByRole("heading", { name: /PGAGI DEMO/i }),
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter your name")).toBeVisible();

    await page.getByPlaceholder("Enter your name").fill("NewUser");
    await page.getByRole("button", { name: "Access Dashboard" }).click();

    await expect(
      page.getByRole("heading", { name: /Your Personalized Feed/i }),
    ).toBeVisible({ timeout: 5000 });

    await expect(
      page.locator("div.rounded-full").filter({ hasText: /^N$/i }),
    ).toBeVisible();

    await page.reload();
    await page.waitForLoadState("networkidle");
    await expect(
      page.locator("div.rounded-full").filter({ hasText: /^N$/i }),
    ).toBeVisible();

    await page.getByRole("button", { name: /logout/i }).click();

    await expect(
      page.getByRole("heading", { name: /PGAGI DEMO/i }),
    ).toBeVisible();
  });
});
