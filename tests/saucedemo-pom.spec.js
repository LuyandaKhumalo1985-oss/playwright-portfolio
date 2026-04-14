import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Saucedemo POM Tests', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('user can login successfully', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });

  test('wrong password shows error', async ({ page }) => {
    await loginPage.login('standard_user', 'wrongpassword');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

  test('user can logout', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await page.locator('[id="react-burger-menu-btn"]').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});