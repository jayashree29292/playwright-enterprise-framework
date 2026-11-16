import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RoomsPage } from '../pages/RoomsPage';

type PageFixtures = {
  loginPage: LoginPage;
  roomsPage: RoomsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  roomsPage: async ({ page }, use) => {
    await use(new RoomsPage(page));
  },
});

export { expect } from '@playwright/test';
