const {Given, When, Then} = require("cucumber");
const https = require("https");
let querystring = require('querystring')
let basePage = require('../pageObj/BasePage')
let aimLocators = require('../pageObj/Selectors/aimSelectors')


Given(/^User open Aim$/,async function () {
    await browser.url('https://chat-qa.aimprosoft.com');
    await browser.maximizeWindow()
    await browser.pause(2000)
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
    await browser.deleteAllCookies();
    for (let cookie of loginCookies) {
        const cookieNameValue = cookie.split(';')[0].split('=');
        const driverCookie = {
            name: cookieNameValue[0],
            value: cookieNameValue[1]
        }
        await browser.setCookies(driverCookie);
    }

    await browser.url('https://chat-qa.aimprosoft.com/#/chat/4')
    await browser.pause(5000)
})
When(/^User enter smth in the Main input field$/,  async function () {
   await browser.pause(2000)
     await basePage.fillAnyField(aimLocators.Main_Input_Aim )
    await browser.pause(3000)
});
Then(/^Verify that Aim chat is open$/, async function () {
    await browser.waitUntil(   async () => (await browser.$('span[class = \'room-name \']').isDisplayed()))
});