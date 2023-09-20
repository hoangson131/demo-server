const accountService = require("../services/accountService.js")

function userAuthentication(req, res, next) {
    accountService.userAuthentication(req,res)
    next();
}

module.exports = userAuthentication;
