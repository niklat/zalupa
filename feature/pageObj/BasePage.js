class BasePage {
     fillAnyField (selector) {
         browser.$(selector).click()

    }

};

module.exports = new BasePage()