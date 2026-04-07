const { test, expect } = require('@playwright/test');

test.describe('CloudPark Website Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://cloudpark-99.netlify.app/');
  });

  test('homepage loads', async ({ page }) => {
    await expect(page).toHaveTitle(/CloudPark/i);
    await expect(
      page.getByRole('heading', {
        name: /Smart Digital Advertising/i,
      })
    ).toBeVisible();
  });

  test('navigation links exist', async ({ page }) => {
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Gallery/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Advertise/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Contact/i })).toBeVisible();
  });

  test('CTA buttons work', async ({ page }) => {
    const enquire = page.getByRole('link', { name: /Enquire Now/i });
    const start = page.getByRole('link', { name: /Start Advertising/i });

    await expect(enquire).toBeVisible();
    await expect(start).toBeVisible();

    await expect(enquire).toHaveAttribute('href', /wa\.me|whatsapp/i);
    await expect(start).toHaveAttribute('href', /wa\.me|whatsapp/i);
  });

  test('about section visible', async ({ page }) => {
    await expect(page.getByText(/About CloudPark/i)).toBeVisible();
    await expect(page.getByText(/Choose Package/i)).toBeVisible();
    await expect(page.getByText(/Display Ads/i)).toBeVisible();
  });

  test('contact section visible', async ({ page }) => {
    await expect(page.getByText(/\+27/i)).toBeVisible();
    await expect(page.getByText(/sales@cloudpark\.co\.za/i)).toBeVisible();
  });

  test('footer visible', async ({ page }) => {
    await expect(page.getByText(/CloudPark/i).last()).toBeVisible();
  });

});