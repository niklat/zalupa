// let queryString = require('querystring')
// let https = require('https')
// // function getCookiesFunction() {
// //     let bodyFormData = queryString.stringify({
// //         username: '213cdv',
// //         password: 'Test1234',
// //         'remember-me': true
// //     })
// //     let c;
// //     const options = {
// //         hostname: 'chat-qa.aimprosoft.com',
// //         port: 443,
// //         path: '/login',
// //         method: 'POST',
// //         data: bodyFormData,
// //         headers: {
// //             'Content-Type': 'application/x-www-form-urlencoded',
// //             'Content-Length': bodyFormData.length
// //         }
// //     }
// //     let req = https.request(options, async res => {
// //         c = {cookie: res.headers['set-cookie']};
// //         return c;
// //     })
// //
// //
// //     req.on('error', error => {
// //         console.error(error)
// //     })
// //
// //     req.write(bodyFormData)
// //
// //     req.end()
// //
// //
// // }
//
//
//
//
// function doPostCall(options, data) {
//     return new Promise(function (resolve, reject) {
//         try {
//             const req = https.request(options, res => {
//
//                 if (res.statusCode < 200 && res.statusCode > 302) {
//                     reject(Bad request ${res.statusCode});
//                 }
//
//                 const data = [];
//                 let buffer = '';
//                 res.on('data', d => {
//                     data.push(d);
//                 }).on('end', () => {
//                     buffer = Buffer.concat(data);
//                 });
//
//                 const response = {
//                     data: buffer.toString(),
//                     headers: res.headers
//                 }
//
//                 resolve(response);
//             });
//
//             req.on('error', error => {
//                 reject(Bad request ${error});
//             });
//             req.write(data);
//
//             req.end();
//         } catch (e) {
//             reject(e);
//         }
//     });
// }
// module.exports ={doPostCall}