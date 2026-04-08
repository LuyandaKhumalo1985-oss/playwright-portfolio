import { test, expect } from '@playwright/test';

test('user can login with valid credentials', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
});

test('user cannot login with invalid credentials', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  await page.locator('#username').fill('wronguser');
  await page.locator('#password').fill('wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.locator('#flash')).toBeVisible();
});