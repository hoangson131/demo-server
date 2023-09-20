//========================Require Libraries======================================================================
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)

const AccountModel = require('../models/accountModel');

const secretkey = "secretkey"
let currentUserID = null
function generateToken(user) {
    const payload = {
        userID: user.id,
        username: user.username
    }
    const options = {
        expiresIn: 1500,
    }
    const token = jwt.sign(payload, secretkey, options)
    return token
}

function getAllUsers(req,res) {
    AccountModel.find({
        username: "admin"
    })
    .then((users) => {
        return res.json(...users)
    })
    .catch((err) => res.status(500).json(err))
}

function getInforUserCurrent (req,res) {
    console.log("getInforUserCurrent", currentUserID);
    AccountModel.findOne({
        _id: currentUserID
    })
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => res.status(500).json({message: err}))
    // return AccountModel.find((user) => user.username === username)
}

function registerUser (req, res) {
    const user = req.body
    const hash = bcrypt.hashSync(user.password, 10)
    user.password = hash
    AccountModel.findOne({
        username: user.username
    })
    .then((userOld) => {
        if(userOld) {
            return res.json("User already exists")
        } else {
        return AccountModel.create({
            username: user.username,
            password: user.password
        })
        .then((data) => {
            console.log(data);
            return res
                    .status(200)
                    .json("tao tai khoan thanh cong")
        })
        }
    })
    .catch(() => res.status(500).json('loi Server'))

}

function userAuthentication(req, res){
    const token = req.cookies
    console.log("Cookies: ",token);
    const decodeToken = jwt.verify(token.CookieCustorm, secretkey, (err, cookie) => {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            return cookie.userID
        }
    });
    console.log("decodeTokenID",decodeToken);
    return currentUserID = decodeToken
}

function loginUser(req, res) {  
    const {username, password} = req.body

    AccountModel.findOne({
        username: username,
    })
    .then(user => {
        if(user && bcrypt.compare(password, user.password)) {
           const enCodeToken = generateToken(user) 
           res
            .status(200)
            .json({
                message: "Login successful",
                token: enCodeToken
            })
        } else {
            res.status(401).json("Passwords Invalid")
        }
    })
    .catch((err) => res.status(500).json(err))
}

module.exports = {
    getAllUsers,
    getInforUserCurrent,
    registerUser,
    userAuthentication,
    loginUser,
}