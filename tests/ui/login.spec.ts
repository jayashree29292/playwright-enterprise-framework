import { test, expect } from '../../fixtures/index';
import { AdminCredentials } from '../../utils/testData';
import { Logger } from '../../utils/logger';

test.describe('Admin Login', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login with valid credentials', { tag: ['@smoke', '@critical'] }, async ({ loginPage, page }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(
        AdminCredentials.valid.username,
        AdminCredentials.valid.password
      );
      Logger.uiState('Credentials used', AdminCredentials.valid.username);
    });

    await test.step('Verify successful login', async () => {
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
      Logger.uiState('Login successful', true);
    });
  });

  test('should show error with invalid credentials', { tag: ['@regression'] }, async ({ loginPage }) => {
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

  test('should show error when fields are empty', { tag: ['@regression'] }, async ({ loginPage }) => {
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
