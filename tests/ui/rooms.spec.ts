import { test, expect } from '@playwright/test';
import { RoomsPage } from '../../pages/RoomsPage';
import { RoomData } from '../../utils/testData';
import { Logger } from '../../utils/logger';

test.describe('Rooms Page', () => {

  test('@smoke should display Our Rooms heading', async ({ page }) => {
    await test.step('Navigate to homepage', async () => {
      const roomsPage = new RoomsPage(page);
      await roomsPage.goto();
      Logger.step('Navigated to homepage');
    });

    await test.step('Verify Our Rooms heading is visible', async () => {
      await expect(
        page.getByRole('heading', { name: 'Our Rooms' })
      ).toBeVisible();
      Logger.uiState('Heading visible', 'Our Rooms');
    });
  });

  test('@regression should display exactly 3 rooms', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();

    await test.step('Count room cards on page', async () => {
      const count = await roomsPage.getRoomCount();
      Logger.uiState('Room count', count);
      expect(count).toBe(3);
    });
  });

  test('@regression should display all three room types', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();

    for (const roomType of RoomData.types) {
      await test.step(`Verify ${roomType} room is visible`, async () => {
        const room = await roomsPage.getRoomByName(roomType);
        await expect(room).toBeVisible();
        Logger.uiState(`${roomType} room visible`, true);
      });
    }
  });

  test('@regression should show Book now button for each room', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();

    for (const roomType of RoomData.types) {
      await test.step(`Verify Book now button for ${roomType}`, async () => {
        const button = await roomsPage.getBookNowButton(roomType);
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        Logger.uiState(`${roomType} Book now button`, 'visible and enabled');
      });
    }
  });

  test('@regression should validate room prices using soft assertions', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();

    for (const roomType of RoomData.types) {
      await test.step(`Validate ${roomType} room price`, async () => {
        const price = await roomsPage.getPriceText(roomType);
        Logger.uiState(`${roomType} price`, price);
        expect.soft(price).toContain(RoomData.prices[roomType]);
      });
    }

    expect(test.info().errors).toHaveLength(0);
  });

  test('@regression should display amenities for each room', async ({ page }) => {
    const roomsPage = new RoomsPage(page);
    await roomsPage.goto();

    for (const roomType of RoomData.types) {
      await test.step(`Verify ${roomType} room amenities`, async () => {
        const room = await roomsPage.getRoomByName(roomType);
        for (const amenity of RoomData.amenities[roomType]) {
          await expect.soft(room.getByText(amenity)).toBeVisible();
        }
        Logger.uiState(`${roomType} amenities verified`, RoomData.amenities[roomType]);
      });
    }
  });

});
