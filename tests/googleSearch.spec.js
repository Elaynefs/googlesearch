
import { test, expect } from '@playwright/test';
import { GooglePageObject } from './page-objects/googlePageObject';

test.describe('Google Search: Access the second result item in a new tab.', () => {

  let SEARCH_KEY = 'selenium';

  test.beforeEach(async ({ page }) => {
    test.slow();
  });

  test('Searching by search text field', async ({ context }) => {
    const page = await context.newPage();
    let googleSearchPage = new GooglePageObject(page);

    await googleSearchPage.goto();
    await googleSearchPage.search(SEARCH_KEY);
    let secondSearchedItem = await googleSearchPage.getTheSearchedItemLink(2)
    let newTab =  await googleSearchPage.openTheSearchedtemInANewTab(2, context);

    expect(secondSearchedItem).toContain(newTab.url());
    expect(await googleSearchPage.getGooglePageTitle()).toContain(googleSearchPage.GOOGLE_SEARCH_PAGE_TITLE_EN);
  });

  
  test('Searching by url parameter', async ({ context }) => {
    const page = await context.newPage();
    let googleSearchPage = new GooglePageObject(page);

    await googleSearchPage.gotoSearchURL(SEARCH_KEY);
    let secondSearchedItem = await googleSearchPage.getTheSearchedItemLink(2)
    let newTab = await googleSearchPage.openTheSearchedtemInANewTab(2, context);

    expect(secondSearchedItem).toContain(newTab.url());
    expect(await googleSearchPage.getGooglePageTitle()).toContain(googleSearchPage.GOOGLE_SEARCH_PAGE_TITLE_EN);
  });


})


