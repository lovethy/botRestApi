const users = { "name":"bb" };
const request = require('request');

let getIndex = () => {
    try {
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

let getApi = (req) => {
    try {
        console.log(req.headers);
        console.log(req.headers.authorization);
        console.log(req.body);
        
        return new Promise(async function(resolve, reject) {
            
            var intent = await getIntent(req.body.qry);

            req.body.intent = intent;
            console.log(intent, req.body.intent);

            resolve(req.body);
            //     setTimeout(() => {
            //         resolve(req.body);
            //    } , 1000); 
        });
    } catch (e) {
        // Log Errors
        throw Error(e);
    }
}


let getIntent = (q) => {
    return new Promise( (resolve) => {
        var url = 'https://testluis-jhlee.cognitiveservices.azure.com/luis/prediction/v3.0/apps/c6c0c2e5-dfdb-4143-b5e5-4e0b49cf9773/slots/staging/predict?subscription-key=06e49e5562de45aea13a95d6943c0a2c&verbose=true&show-all-intents=true&log=true&query=' + q;

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
    getIndex : getIndex,
    getApi : getApi
}