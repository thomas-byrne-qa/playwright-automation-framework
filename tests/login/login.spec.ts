import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { readExcelRows } from '../../utils/excelReader';

type LoginRow = {
  username: string;
  password: string;
};

const loginRows = readExcelRows<LoginRow>('test-data/login_data.xlsx');
const [validUser, lockedOutUser, invalidPasswordUser] = loginRows;

test.describe('Login tests', () => {
  test('@smoke valid login redirects to inventory page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('locked out user sees correct error message', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(lockedOutUser.username, lockedOutUser.password);

    await expect(loginPage.errorMessage()).toContainText('Sorry, this user has been locked out.');
  });

  test('invalid password shows username and password mismatch error', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(invalidPasswordUser.username, invalidPasswordUser.password);

    await expect(loginPage.errorMessage()).toContainText(
      'Username and password do not match any user in this service'
    );
  });

  test('blank credentials show required field validation', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage()).toContainText('Username is required');
  });
});
