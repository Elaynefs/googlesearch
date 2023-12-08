export class GooglePageObject {

    /**
    * @param {import('@playwright/test').Page} page
    */
    constructor(page) {
        this.page = page;
        this.SEARCH_KEY = 'selenium';
        this.SEARCH_BUTTON_NAME = 'Google Search';
        this.GOOGLE_SEARCH_PAGE_TITLE_EN = `${this.SEARCH_KEY} - Google Search`;
    }

    async goto() {
        await this.page.goto('./');
    }

    async gotoSearchURL(SEARCH_KEY) {
        this.URL_WITH_PARAMETER_KEY = `./search?q=${SEARCH_KEY}`;
        await this.page.goto(this.URL_WITH_PARAMETER_KEY);
    }

    async search(query) {
        await this.page.getByRole('combobox').fill(this.SEARCH_KEY)
        await this.page.getByRole('button').filter({ hasText: `${this.SEARCH_BUTTON_NAME}` }).click()
    }

    async getTheSearchedItem(itemNumber) {
        let item = await this.page.locator('a >> h3:visible').nth(itemNumber - 1);
        return item;
    }


    async getTheSearchedItemLink(itemNumber) {
        const parent = await this.page.locator('a[href] >> h3:visible').nth(itemNumber - 1).locator('xpath=..').getAttribute('href');
        return parent;
    }


    async getGooglePageTitle() {
        return this.page.title();
    }

    async openTheSearchedtemInANewTab(itemNumber, context) {
        let secondSearchedItem = await this.getTheSearchedItem(itemNumber);
        const [newtab] = await Promise.all([
            context.waitForEvent('page'),
            this.page.keyboard.down('Control'),
            secondSearchedItem.click({ modifiers: ['Meta'] })
        ]);

        await newtab.waitForLoadState('domcontentloaded');
        await newtab.waitForSelector('h1');

        return newtab;
    }

}
