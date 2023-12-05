# googlesearch


## Environment setup
- npm install


## Executing the test
- npm test => To execute the test headless
- npm run testui => To execute the test opening the modal page.
- npm run report => To open the html report 



## Test Strategy
### Cross browser coverage:
  The test is being executed in Chrome, Safari and Firefox.

### Test coverage:
  There are two test cases. One perform the searsh using the key search as a url parameter. The second test fill the search text field with the key and then execute the test openign the second result item in a new tab. 

## Implementation

Playwright framework is being used to implement the e2e test. For more information, please visit https://playwright.dev/docs. 

I would like to inform that for this experiment I have decided to use Application Actions instead of Page Object Pattern, because we are not we are not using the same element locators across different scripts. For this reason, I am just using constants to keep the page test info clear and easy to maintain. For more information, please visit https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions.
