const express = require('express');
var ui = express.Router();
const footer = require('./Footer');
const home = require('./Home');

ui.get('/footer', (req, res) => {
    res.json(footer)
})

ui.get('/home', (req, res) => {
    res.json(home)
})

ui.get('/', (req, res, next) => {
    res.json({...home, ...footer})
})

module.exports = ui