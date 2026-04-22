import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successHeader: Locator;
  readonly errorBanner: Locator;

  constructor(private page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successHeader = page.locator('.complete-header');
    this.errorBanner = page.locator('[data-test="error"]');
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  successMessage() {
    return this.successHeader;
  }

  errorMessage() {
    return this.errorBanner;
  }
}
