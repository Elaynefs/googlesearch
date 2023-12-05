
import { test, expect } from '@playwright/test';

const uaParser = require('ua-parser-js');



test.describe('Google Search: Access the second result item in a new tab.', () => {

  let SEARCH_KEY = 'selenium';
  let URL_WITH_PARAMETER_KEY = `./search?q=${SEARCH_KEY}`;
  let SEARCH_BUTTON_NAME = 'Google Search';
  let GOOGLE_PAGE_TITLE = 'Google';
  let GOOGLE_SEARCH_PAGE_TITLE_EN = `${SEARCH_KEY} - Google Search`;


  test.beforeEach(async ({ page }) => {
    test.slow();
  });

  test('Searching by search text field', async ({ page }) => {

    await page.goto('./');
    await page.getByRole('combobox').fill(SEARCH_KEY)
    await page.getByRole('button').filter({ hasText: `${SEARCH_BUTTON_NAME}` }).click()

    let elementText = await page.locator('a >> h3:visible').nth(1).textContent();

    const [newtab] = await Promise.all([
      page.context().waitForEvent('page'),
      page.keyboard.press('Control'),
      page.locator('a >> h3:visible').nth(1).click( { modifiers: ['Meta'] })
    ]);

    expect(page).toHaveTitle(`${GOOGLE_SEARCH_PAGE_TITLE_EN}`);
    expect(elementText).toContain(await newtab.title());

  });

  test('Searching by url parameter', async ({ page }) => {
    await page.goto(URL_WITH_PARAMETER_KEY);
    let elementText = await page.locator('a >> h3:visible').nth(1).textContent();

    const [newtab] = await Promise.all([
      page.context().waitForEvent('page'),
      page.keyboard.press('Control'),
      page.locator('a >> h3:visible').nth(1).click( { modifiers: ['Meta'] })
    ]);
    
     expect(page).toHaveTitle(`${GOOGLE_SEARCH_PAGE_TITLE_EN}`);
     expect(elementText).toContain(await newtab.title());

  });





})


