import { Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly shoppingCartBadge: Locator;
  readonly addBackpackButton: Locator;
  readonly cartLink: Locator;

  constructor(private page: Page) {
    this.title = page.locator('.title');
    this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.addBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addItemToCart() {
    await this.addBackpackButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
