const request = require('request');
require('dotenv').config();

let getApi = (req) => {
    try {
        console.log(req.headers);
        console.log(req.body);

        return new Promise(async function(resolve, reject) {
            var intent = await getIntent(req.body.msg);
            req.body.intent = intent;
            resolve(req.body);
        });
    } catch (e) {
        // Log Errors
        throw Error(e);
    }
}


let getIntent = (q) => {
    return new Promise( (resolve) => {
        var url = process.env.luisUrl + q;

        //console.log(`query : ${url} `);

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var rs = JSON.parse(body);
                console.log(rs.prediction.intents);
                resolve(rs.prediction.topIntent);
            }
        })
    });
}

module.exports = {
    getApi : getApi
}