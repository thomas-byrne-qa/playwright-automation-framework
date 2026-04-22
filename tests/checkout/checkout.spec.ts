import { expect, test } from '@playwright/test';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';

async function loginAndStartCheckout(page: Parameters<typeof test>[0]['page']) {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.addItemToCart();
  await expect(inventoryPage.shoppingCartBadge).toHaveText('1');
  await inventoryPage.goToCart();
  await page.locator('[data-test="checkout"]').click();
}

test.describe('Checkout tests', () => {
  test('@smoke complete checkout flow', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await loginAndStartCheckout(page);
    await checkoutPage.fillDetails('John', 'Doe', '12345');
    await checkoutPage.finishOrder();

    await expect(checkoutPage.successMessage()).toHaveText('Thank you for your order!');
  });

  test('checkout blocks progress when first name is missing', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await loginAndStartCheckout(page);
    await checkoutPage.fillDetails('', 'Doe', '12345');

    await expect(checkoutPage.errorMessage()).toContainText('First Name is required');
  });
});
