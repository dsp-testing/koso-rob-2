import { expect, test } from "@playwright/test";
import {
  hasHorizontalScrollbar,
  init,
  setupNewProject,
  tearDown,
} from "./utils";

test.describe.configure({ mode: "parallel" });

test.describe("inbox tests", () => {
  test.beforeEach(async ({ page }) => {
    await setupNewProject(page);
    await page.getByTitle("Zero Inbox").click();
    await page.waitForURL("**/inbox");
  });

  test.afterAll(async () => {
    await tearDown();
  });

  test.describe("view", () => {
    test("no tasks displays Inbox zero! message", async ({ page }) => {
      await init(page, [{ id: "root", name: "Root", children: [] }]);

      await expect(page.getByText("Inbox zero!")).toBeVisible();
    });
  });

  test.describe("horizontal scrollbar", () => {
    test("detect the presence of a horizontal scrollbar", async ({ page }) =>
      expect(await hasHorizontalScrollbar(page)).toBe(false));
  });
});
