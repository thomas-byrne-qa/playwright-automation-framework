import { expect, test } from '@playwright/test';
import { readExcelRows } from '../../utils/excelReader';

type ApiCheckRow = {
  endpoint: string;
  field: string;
  expectedValue: string;
};

const apiChecks = readExcelRows<ApiCheckRow>('test-data/api_checks.xlsx');

test.describe('API validation against Excel test data', () => {
  for (const row of apiChecks) {
    test(`matches ${row.endpoint} -> ${row.field}`, async ({ request }) => {
      const response = await request.get(`https://jsonplaceholder.typicode.com${row.endpoint}`);
      expect(response.ok()).toBeTruthy();

      const body = await response.json();
      const actualValue = String(body[row.field]).trim();
      const expectedValue = String(row.expectedValue).trim();

      expect(actualValue).toBe(expectedValue);
    });
  }

  test('returns 404 for an unknown endpoint', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/999999');
    expect(response.status()).toBe(404);
  });
});
