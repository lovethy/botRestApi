const users = { "name":"bb" };


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
        return new Promise(function(resolve, reject) {
            setTimeout(() => {
                resolve(req.body);
           } , 1000); 
        });
    } catch (e) {
        // Log Errors
        throw Error(e);
    }
}

module.exports = {
    getIndex : getIndex,
    getApi : getApi
}