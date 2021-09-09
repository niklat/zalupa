const {Given, When, Then} = require("cucumber");
let basePage = require('../pageObj/Pages/BasePage')
let aimLocators = require('../pageObj/Selectors/aimSelectors')
const https = require("https");
const querystring = require("querystring");

Given(/^Set Default Settings.$/, async function () {
    await browser.maximizeWindow();
    await browser.deleteAllCookies();
});

Given(/^User open Aim.$/,async function () {
    await browser.url('https://chat-qa.aimprosoft.com');
    async function login(){
        const data = querystring.stringify({
            username: '213cdv',
            password: 'Test1234',
            'remember-me': true
        });

        const options = {
            hostname: 'chat-qa.aimprosoft.com',
            port: 443,
            path: '/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': data.length
            }
        };


        return doPostCall(options, data);
    }

    function doPostCall(options, data) {
        return new Promise(function (resolve, reject) {
            try {
                const req = https.request(options, res => {

                    if (res.statusCode < 200 && res.statusCode > 302) {
                        reject('Bad request ${res.statusCode}');
                    }

                    const data = [];
                    let buffer = '';
                    res.on('data', d => {
                        data.push(d);
                    }).on('end', () => {
                        buffer = Buffer.concat(data);
                    });

                    const response = {
                        data: buffer.toString(),
                        headers: res.headers
                    }

                    resolve(response);
                });

                req.on('error', error => {
                    reject('Bad request ${error}');
                });
                req.write(data);

                req.end();
            } catch (e) {
                reject(e);
            }
        });
    }
    const resp = await login();
    const loginCookies = resp.headers['set-cookie'];
    for (let cookie of loginCookies) {
        const cookieNameValue = cookie.split(';')[0].split('=');
        const driverCookie = {
            name: cookieNameValue[0],
            value: cookieNameValue[1]
        }
        await browser.setCookies(driverCookie)
    }

    await browser.url('https://chat-qa.aimprosoft.com/#/chat/4')
})
When(/^Click on the Room Members on the Right panel.$/,  async function () {
    await basePage.clickOnElement(aimLocators.Main_Input_Aim )
});
Then(/^Verify that Aim chat is open.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(aimLocators.General_Room).isDisplayed()))
});
When(/^Enter "([^"]*)" in the search field.$/, async function (message) {
    await basePage.fillAnyField(aimLocators.Search_Field_Room_Members_Option, message)
});
Then(/^Verify that user is found.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(aimLocators.Super_Admin_Found).isDisplayed()))
});
When(/^Click on the User icon.$/, async function () {
    await basePage.clickOnElement(aimLocators.Super_Admin_Found);
});
When(/^Click on the Start Direct button.$/, async function () {
    await basePage.clickOnElement(aimLocators.Start_Direct_Button)
});
Then(/^Verify that chat with superadmin is open.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(aimLocators.Super_Admin_Direct_Header).isDisplayed()))
});