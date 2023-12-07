# Googlesearch experiment


## Environment setup
- npm install


## Executing the test
- npm test => To execute the test headless
- npm run testui => To execute the test opening the modal page.
- npm run report => To open the html report 



## Test Strategy
### Cross-browser coverage:
  The test is being executed in Chrome, Safari, and Firefox.

### Test coverage:
  There are two test cases. One performs the search using the key search as a URL parameter. The second test fills the search text field with the key and then executes the test opening the second result item in a new tab. 

## Implementation

The playwright framework is being used to implement the e2e test. For more information, please visit https://playwright.dev/docs. 

I want to inform you that for this experiment I have decided to use Application Actions instead of Page Object Patterns because we are not using the same element locators across different scripts. For this reason, I am just using constants to keep the page test info clear and easy to maintain. For more information, please visit https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions.

Additionally, I added the commands below to visualize the new tab being loaded. However, it might make the test slow. So, I added it only to the first scenario. 
<code>
      await newtab.waitForLoadState('domcontentloaded');
      await newtab.waitForSelector('h1');
</code>