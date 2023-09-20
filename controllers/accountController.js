const accountService = require('../services/accountService')

// lay danh sach người dùng
function getAllUsers(req,res) {
    accountService.getAllUsers(req,res)
}

//Register user
function registerUser(req, res) {
    accountService.registerUser(req,res)
}

//userAuthentication
function userAuthentication(req, res) {
    accountService.userAuthentication(req,res)
}

// Lay thong tin nguoi dung qua usernname 
function getInforUserCurrent(req,res) {
    accountService.getInforUserCurrent(req,res)
}

//Login user
function loginUser(req, res) {
    accountService.loginUser(req,res)
}

module.exports = {
    getAllUsers,
    getInforUserCurrent,
    registerUser,
    userAuthentication,
    loginUser
}