const express = require('express');
var register = express.Router();
var bodyParser = require('body-parser');



register.post('/', (req, res, next) => {
    var phonenumber = req.body.phonenumber
    console.log(phonenumber);
    res.status(200).send(`Successfully logged in user ${phonenumber}`)
})

// ui.get('', (req, res, next) => {

//     next()
// })

module.exports = register