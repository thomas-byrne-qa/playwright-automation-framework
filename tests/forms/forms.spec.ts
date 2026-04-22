import { expect, test } from '@playwright/test';

test.describe('DemoQA text box form', () => {
  test('valid form submission displays entered details', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    await page.getByPlaceholder('Full Name').fill('John Doe');
    await page.getByPlaceholder('name@example.com').fill('john@example.com');
    await page.locator('#currentAddress').fill('123 Street');
    await page.locator('#permanentAddress').fill('456 Street');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.locator('#output')).toContainText('John Doe');
    await expect(page.locator('#output')).toContainText('john@example.com');
  });

  test('invalid email keeps the email field marked as invalid', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');

    const emailInput = page.getByPlaceholder('name@example.com');
    await emailInput.fill('johnexample.com');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(emailInput).toHaveClass(/field-error/);
    await expect(page.locator('#output')).toBeHidden();
  });
});
