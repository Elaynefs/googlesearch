
import { test, expect } from '@playwright/test';


test.describe('Google Search: Access the second result item in a new tab.', () => {

  let SEARCH_KEY = 'selenium';
  let URL_WITH_PARAMETER_KEY = `./search?q=${SEARCH_KEY}`;
  let SEARCH_BUTTON_NAME = 'Google Search';
  let GOOGLE_SEARCH_PAGE_TITLE_EN = `${SEARCH_KEY} - Google Search`;


  test.beforeEach(async ({ page }) => {
    test.slow();
  });

  test('Searching by search text field', async ({ context }) => {
    const page = await context.newPage();
    await page.goto('./');
    await page.getByRole('combobox').fill(SEARCH_KEY)
    await page.getByRole('button').filter({ hasText: `${SEARCH_BUTTON_NAME}` }).click()

    let secondSearchedItem = await page.locator('a >> h3:visible').nth(1).textContent();

    const [newtab] = await Promise.all([
      context.waitForEvent('page'),
      page.keyboard.down('Control'),
      page.locator('a >> h3:visible').nth(1).click({ modifiers: ['Meta'] })
    ]);

    let newTabTitle = (await newtab.title()).substring(0, 10);
    let pageTitle = await page.title();
    expect(pageTitle).toContain(`${GOOGLE_SEARCH_PAGE_TITLE_EN}`);
    expect(secondSearchedItem).toContain(newTabTitle);

  });

  test('Searching by url parameter', async ({ context }) => {
    const page = await context.newPage();
    await page.goto(URL_WITH_PARAMETER_KEY);
    let secondSearchedItem = (await page.locator('a >> h3:visible').nth(1).textContent()).substring(0, 10);
    console.log(`Second searched item to be clicked:: ${secondSearchedItem}`);
    const [newtab] = await Promise.all([
      context.waitForEvent('page'),
      page.keyboard.down('Control'),
      page.locator('a >> h3:visible').nth(1).click({ modifiers: ['Meta'] })
    ]);

    
    await newtab.waitForLoadState('domcontentloaded', { timeout: 10000 });
    let pageTitle = await page.title();
    let newTabTitle = (await newtab.title()).substring(0, 10);
    expect(pageTitle).toContain(`${GOOGLE_SEARCH_PAGE_TITLE_EN}`);
    expect(secondSearchedItem).toContain(newTabTitle);

  });


})


