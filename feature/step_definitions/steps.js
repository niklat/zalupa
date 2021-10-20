const {Given, When, Then} = require("cucumber");
let basePage = require('../pageObj/Pages/BasePage')
let leftPanel = require('../pageObj/Selectors/leftPanel')
const https = require("https");
const querystring = require("querystring");
let rightPanel = require('../pageObj/Selectors/rightPanel')


Given(/^Set Default Settings.$/, async function () {
    await browser.maximizeWindow();
    await browser.deleteAllCookies();
});

Given(/^User open Aim.$/,async function () {
    await browser.url('https://chat-qa.aimprosoft.com');

    async function login() {
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
                    console.log(res.statusCode)
                    if (res.statusCode < 200 && res.statusCode > 302) {
                        reject('Bad request ${res.statusCode}');
                    }

                    let dat = [];
                    let buffer = '';
                    res.on('data', (d) => {
                        dat.push(d);
                    }).on('end', () => {
                        buffer = Buffer.concat(dat);
                        resolve({
                            data: buffer.toString(),
                            headers: res.headers
                        })
                    });
                })
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


    function doGetCall(options) {
        return new Promise(function (resolve, reject) {
            try {
                const req = https.request(options, res => {
                    console.log(res.statusCode)
                    if (res.statusCode < 200 && res.statusCode > 302) {
                        reject('Bad request ${res.statusCode}');
                    }

                    let buffer = '';
                    const response = {
                        data: buffer.toString(),
                        headers: res.headers.location
                    }

                    resolve(response);

                });

                req.on('error', error => {
                    reject('Bad request ${error}');
                });


                req.end();
            } catch (e) {
                reject(e);
            }
        });
    }


    const resp = await login();
    let cookies = '';

    const cookieHeaders = resp.headers['set-cookie'];

    for (let i = cookieHeaders.length - 1; i >= 0; i--) {
        const cookieNameValue = cookieHeaders[i].split(';')[0];
        let sep = cookies.length > 0 ? '; ' : '';
        cookies += sep + cookieNameValue;
    }
    //
    for (let cookie of cookieHeaders) {
        const cookieNameValue = cookie.split(';')[0];
        let sep = cookies.length > 0 ? '; ' : '';
        cookies += sep + cookieNameValue;

    }

        await browser.url('https://chat-qa.aimprosoft.com/#/chat/4')


        async function second() {
            let options2 = {
                hostname: 'chat-qa.aimprosoft.com',
                port: 443,
                path: '/oauth/authorize?client_id=aimprosoft_chat&redirect_uri=https://chat-qa.aimprosoft.com/index.html&response_type=code&scope=read',
                method: 'GET',
                headers: {
                    'Cookie':  cookies
                }
            };
            return await doGetCall(options2)
        }

        let location = await second()
        let url = location.headers


    const codeOnly = url.replace(/.*?code=/, "")
    console.log(codeOnly)

    async function third () {
        const data2 = querystring.stringify({
            client_id: 'aimprosoft_chat',
            client_secret: 'EHuUTa',
            code: codeOnly,
            redirect_uri: 'https://chat-qa.aimprosoft.com/index.html'
        });
        const options3 = {
            hostname: 'chat-qa.aimprosoft.com',
            port: 443,
            path: '/oauth/token?grant_type=authorization_code',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookies
            }
        }
        return doPostCall(options3,data2)
    }
    const getAccessToken = await third()
    let body = getAccessToken.data
    let zalupa = JSON.parse(body)
    let alupa = `${zalupa.token_type} ${zalupa.access_token}`
    console.log(typeof alupa)
    console.log(alupa)

    let mute = async function () {
    let data4 = {  text: '1200000' }
    const options3 = {
        hostname: 'chat-qa.aimprosoft.com',
        port: 443,
        path: '/api/users/notificationSettings/muteAll',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': cookies,
            'Authorization': body,
            'Content-Length': data4.text.length
        }
    }
    return doPostCall(options3, data4.text)
}

    const muteAll = await mute()
    console.log(muteAll)




    await browser.pause(3000)



})
When(/^Click on the Room Members on the Right panel.$/,  async function () {
    await basePage.clickOnElement(leftPanel.Main_Input_Aim )
});
Then(/^Verify that Aim chat is open.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(leftPanel.General_Room).isDisplayed()))
});
When(/^Enter "([^"]*)" in the search field.$/, async function (message) {
    await basePage.fillAnyField(leftPanel.Search_Field_Room_Members_Option, message)
});
Then(/^Verify that user is found.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(leftPanel.Super_Admin_Found).isDisplayed()))
});
When(/^Click on the User icon.$/, async function () {
    await basePage.clickOnElement(leftPanel.Super_Admin_Found);
});
When(/^Click on the Start Direct button.$/, async function () {
    await basePage.clickOnElement(leftPanel.Start_Direct_Button)
});
Then(/^Verify that chat with superadmin is open.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(leftPanel.Super_Admin_Direct_Header).isDisplayed()))
});
When(/^Click on the last message dropdown and select reply.$/, async function () {
    await browser.$(rightPanel.Last_Message_Aim_Chat).moveTo(rightPanel.Last_Message_Aim_Chat)
    await basePage.clickOnElement(rightPanel.Dropdown_Message)
    await basePage.clickOnElement(rightPanel.Reply_Message_Option)
});
When(/^Click on Emoji icon and select first smile in the Smileys and People category.$/, async function () {
    await basePage.clickOnElement(rightPanel.Reply_Message_Modal_Window )
    await basePage.clickOnElement(rightPanel.Emoji1)
});
When(/^Click on the Reply button.$/,async  function () {
    await basePage.clickOnElement(rightPanel.Reply_Button)
});
Then(/^Verify that user reply on the last message.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(rightPanel.Last_Message_Container).isDisplayed()))
});
When(/^Click on the Add reaction button and select emoji.$/, async function () {
    await browser.$(rightPanel.Last_Message_Aim_Chat).moveTo(rightPanel.Last_Message_Aim_Chat)
    await basePage.clickOnElement(rightPanel.Add_Reaction_Button)
    await basePage.clickOnElement(rightPanel.Emoji1)
});
Then(/^Verify that reaction added.$/,async function () {
    await browser.waitUntil(   async () => (await browser.$(rightPanel.Reaction_Panel_Last_Message).isDisplayed()))
});
When(/^Click on the last message dropdown and select pin.$/, async function () {
    await browser.$(rightPanel.Last_Message_Aim_Chat).moveTo(rightPanel.Last_Message_Aim_Chat)
    await basePage.clickOnElement(rightPanel.Dropdown_Message)
    await basePage.clickOnElement(rightPanel.Pin_Message_Option)


});
When(/^Click on the Pin button\.$/, async function () {
    await basePage.clickOnElement(rightPanel.Pin_Button)
});
Then(/^Verify that message pinned\.$/, async function () {
    await browser.waitUntil(   async () => (await browser.$(rightPanel.Pop_Up_Pinned_Message).isDisplayed()))
});
When(/^Click on the user nickname\.$/, async function () {
    await basePage.clickOnElement(rightPanel.User_Nick_Name)
});
When(/^Click on the Notification Settings option\.$/, async function () {
    await basePage.clickOnElement(rightPanel.Notifications_Settings_Option)
});
When(/^Click on the Add room or user button\.$/, async function () {
    await basePage.clickOnElement(rightPanel.Room_Specific_Settings_Add_Button)
    await browser.pause(3000)
});
When(/^Enter in the Search for room or team members field\.$/, async function () {
    await basePage.fillAnyField(rightPanel.Search_Room_Specific_Screen, '&*^%$#@!')
    await browser.pause(3000)
});


When(/^Pause and Refresh$/, async function () {
    await browser.refresh()
    await browser.pause(10000)
});
When(/^get access_token$/,async function () {

});
Given(/^second$/, function () {

});
Given(/^first$/, function () {

});
Given(/^third$/, function () {

});
Given(/^fourth$/, function () {

});