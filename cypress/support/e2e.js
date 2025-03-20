//import '@shelex/cypress-allure-plugin';
import '@mmisty/cypress-allure-adapter/support';
import './commands'

beforeEach(() => {
    CommonPageMethods.navigateToDemoBlaze();
})