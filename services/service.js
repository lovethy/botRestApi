const users = { "name":"bb" };


let getIndex = async function () {
    try {
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}

let getApi = async function (req) {
    try {
        return req.body;
    } catch (e) {
        // Log Errors
        throw Error(e);
    }
}

module.exports = {
    getIndex : getIndex,
    getApi : getApi
}