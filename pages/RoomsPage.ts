import { Page, Locator } from '@playwright/test';

export class RoomsPage {
  private page: Page;
  private roomCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.roomCards = page.locator('.room-card');
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async getRoomCount() {
    return this.roomCards.count();
  }

  async getRoomByName(name: string) {
    return this.roomCards.filter({ hasText: name });
  }

  async getBookNowButton(roomName: string) {
    return this.roomCards
      .filter({ hasText: roomName })
      .getByRole('link', { name: 'Book now' });
  }

  async getPriceText(roomName: string) {
    return this.roomCards
      .filter({ hasText: roomName })
      .locator('.card-footer')
      .textContent();
  }
}
