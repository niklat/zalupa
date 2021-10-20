const querystring = require("querystring");
const https = require("https");

class BasePage {
    async clickOnElement(selector) {
        await browser.$(selector).click();
    }

    async fillAnyField(selector, value) {
        await browser.$(selector).setValue(value);
    }

    async getTextFromElement(selector, attribute) {
        await browser.$(selector).getAttribute(attribute);
    }


}
module.exports = new BasePage();