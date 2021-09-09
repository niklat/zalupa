
class BasePage {
     async clickOnElement (selector) {
       await  browser.$(selector).click();
    }

    async fillAnyField(selector, value) {
      await browser.$(selector).setValue(value);
    }

}

module.exports = new BasePage();