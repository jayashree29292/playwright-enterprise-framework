import { test, expect } from '@playwright/test';
import { RoomsPage } from '../../pages/RoomsPage';
import { Logger } from '../../utils/logger';

test.describe('Rooms Page', () => {

  test('should display Our Rooms heading', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
      const roomsPage = new RoomsPage(page);
      await roomsPage.goto();
      Logger.step('Navigated to homepage');
    });
    await test.step('Verify Our Rooms heading is visible', async () => {
      await expect(page.getByRole('heading', { name: 'Our Rooms' })).toBeVisible();
      Logger.uiState('Heading visible', 'Our Rooms');
    });
  });

  test('should display exactly 3 rooms', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    await test.step('Count room cards on page', async () => {
      const count = await roomsPage.getRoomCount();
      Logger.uiState('Room count', count);
      expect(count).toBe(3);
    });
  });

  test('should display all three room types', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    const roomTypes = ['Single', 'Double', 'Suite'];
    for (const roomType of roomTypes) {
      await test.step(`Verify ${roomType} room is visible`, async () => {
        const room = await roomsPage.getRoomByName(roomType);
        await expect(room).toBeVisible();
        Logger.uiState(`${roomType} room visible`, true);
      });
    }
  });

  test('should show Book now button for each room', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    const roomTypes = ['Single', 'Double', 'Suite'];
    for (const roomType of roomTypes) {
      await test.step(`Verify Book now button for ${roomType}`, async () => {
        const button = await roomsPage.getBookNowButton(roomType);
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        Logger.uiState(`${roomType} Book now button`, 'visible and enabled');
      });
    }
  });

  test('should validate room prices using soft assertions', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    await test.step('Validate Single room price', async () => {
      const price = await roomsPage.getPriceText('Single');
      Logger.uiState('Single room price', price);
      expect.soft(price).toContain('100');
    });
    await test.step('Validate Double room price', async () => {
      const price = await roomsPage.getPriceText('Double');
      Logger.uiState('Double room price', price);
      expect.soft(price).toContain('150');
    });
    await test.step('Validate Suite room price', async () => {
      const price = await roomsPage.getPriceText('Suite');
      Logger.uiState('Suite room price', price);
      expect.soft(price).toContain('225');
    });
    expect(test.info().errors).toHaveLength(0);
  });

  test('should display amenities for each room', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();
    await test.step('Verify Single room amenities', async () => {
      const singleRoom = await roomsPage.getRoomByName('Single');
      await expect.soft(singleRoom.getByText('TV')).toBeVisible();
      await expect.soft(singleRoom.getByText('WiFi')).toBeVisible();
      Logger.uiState('Single room amenities', 'TV, WiFi verified');
    });
    await test.step('Verify Suite room amenities', async () => {
      const suiteRoom = await roomsPage.getRoomByName('Suite');
      await expect.soft(suiteRoom.getByText('Radio')).toBeVisible();
      await expect.soft(suiteRoom.getByText('Safe')).toBeVisible();
      Logger.uiState('Suite room amenities', 'Radio, Safe verified');
    });
  });

});
