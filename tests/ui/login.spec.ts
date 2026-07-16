import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { AdminCredentials } from '../../utils/testData';
import { Logger } from '../../utils/logger';

test.describe('Admin Login', () => {

  test('@smoke @critical should login with valid credentials', async ({ page }) => {
    await test.step('Navigate to admin login page', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.goto();
      Logger.step('Navigated to admin login');
    });

    await test.step('Login with valid credentials', async () => {
      const loginPage = new LoginPage(page);
      await loginPage.login(
        AdminCredentials.valid.username,
        AdminCredentials.valid.password
      );
      Logger.uiState('Credentials used', AdminCredentials.valid.username);
    });

    await test.step('Verify successful login', async () => {
      await expect(page).not.toHaveURL('/admin');
      Logger.uiState('Login successful', true);
    });
  });

  test('@regression should show error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await test.step('Login with invalid credentials', async () => {
      await loginPage.login(
        AdminCredentials.invalid.username,
        AdminCredentials.invalid.password
      );
      Logger.uiState('Invalid credentials used', AdminCredentials.invalid.username);
    });

    await test.step('Verify error message appears', async () => {
      const error = await loginPage.getErrorMessage();
      expect(error).toContain('Invalid credentials');
      Logger.uiState('Error message', error);
    });
  });

  test('@regression should show error when fields are empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await test.step('Submit empty login form', async () => {
      await loginPage.login(
        AdminCredentials.empty.username,
        AdminCredentials.empty.password
      );
      Logger.step('Submitted empty form');
    });

    await test.step('Verify error message appears', async () => {
      const error = await loginPage.getErrorMessage();
      expect(error).toBeTruthy();
      Logger.uiState('Error message visible', true);
    });
  });

});
