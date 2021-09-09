
class BasePage {
     async clickOnElement (selector) {
       await  browser.$(selector).click();
    }

    async fillAnyField(selector, value) {
      await browser.$(selector).setValue(value);
    }

    async getTextFromElement(selector) {
         await browser.$(selector).getText();
    }

}

module.exports = new BasePage();