const accountService = require("../services/accountService")

function userAuthentication(req, res, next) {
    accountService.userAuthentication(req,res)
    next();
}

module.exports = userAuthentication;
