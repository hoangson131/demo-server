const express = require('express');
const router = express.Router()
const accountController = require('../controllers/accountController'); 
const middleware = require('../middleware');

// Dinh nghia cac tuyen duong

router.get('/', accountController.getAllUsers)

router.post('/register', accountController.registerUser)

router.get('/login', middleware.userAuthentication, accountController.userAuthentication)

router.post('/login', accountController.loginUser)

module.exports = router