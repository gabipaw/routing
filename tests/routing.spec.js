// Testy e2e aplikacji wielostronicowej (React Router, HashRouter).
// Uwaga: aplikacja ładuje React/React Router z CDN (esm.sh), więc testy
// wymagają dostępu do sieci; dajemy większy zapas czasu na pierwszy render.
const { test, expect } = require("@playwright/test");

test.setTimeout(45000);
const LONG = { timeout: 20000 };

test("lista: widok główny pokazuje projekty", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("list")).toBeVisible(LONG);
  await expect(page.locator('[data-testid^="item-"]')).toHaveCount(10);
});

test("nawigacja do szczegółów: ID trafia do adresu URL", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("item-3").click(LONG);
  await expect(page).toHaveURL(/#\/items\/3$/);
  await expect(page.getByTestId("details-title")).toHaveText("Lista To-Do", LONG);
});

test("szczegóły ładują się z bezpośredniego linku po ID", async ({ page }) => {
  await page.goto("/#/items/5");
  await expect(page.getByTestId("details-title")).toHaveText("Formularz z walidacją", LONG);
});

test("przyciski wstecz / naprzód przeglądarki działają", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("list")).toBeVisible(LONG);
  await page.getByTestId("item-2").click();
  await expect(page.getByTestId("details-title")).toHaveText("Licznik kliknięć", LONG);

  await page.goBack();
  await expect(page.getByTestId("list")).toBeVisible(LONG);

  await page.goForward();
  await expect(page.getByTestId("details-title")).toHaveText("Licznik kliknięć", LONG);
});

test("nieistniejąca trasa pokazuje 404", async ({ page }) => {
  await page.goto("/#/cos-czego-nie-ma");
  await expect(page.getByTestId("notfound")).toBeVisible(LONG);
  await expect(page.getByTestId("notfound")).toContainText("404");
});

test("nieistniejące ID projektu pokazuje 404", async ({ page }) => {
  await page.goto("/#/items/999");
  await expect(page.getByTestId("notfound")).toBeVisible(LONG);
});
