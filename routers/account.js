const express = require('express');
const router = express.Router()
const AccountModel = require('../models/account')

// Lay du lieu DB
router.get('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    AccountModel.findOne({
        username: username,
        password: password
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => res.status(500).json('Error Server'))
})

// Tao du lieu DB
router.post('/', (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    AccountModel.findOne({
        username: username
    })
    .then((data) => {
        if(data) {
        res.json('user da ton tai')
        } else {
        return AccountModel.create({
            username: username,
            password: password
        })
        }
    })
    .then((data) => {
        res.json("tao tai khoan thanh cong")
    })
    .catch(() => res.status(500).json('loi Server'))
})


// Cap nhat du lieu DB
router.put('/:id', (req, res, next) => {
    var id = req.params.id
    var newPassword = req.body.newPassword

    AccountModel.findByIdAndUpdate(id, {
        password: newPassword
    })
    .then((data) => {
        console.log(data);
        res.json("Update successful")
    })
    .catch(err => res.status(500).json("Error Server"))
})

// Xoa du lieu DB
router.delete('/:id', (req, res, next) => {
    var id = req.params.id
    AccountModel.deleteOne({
        _id: id,
    })
    .then((data) => {
        res.json("Delete Successful")
    })
    .catch(err => res.status(500).json("Error Server"))
})

// Lay du lieu tu id
router.get('/:id', (req, res, next) => {
    var id = req.params.id
    var username = req.body.username
    var password = req.body.password

    AccountModel.find({
        _id: id
    })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => res.status(500).json('Error Server'))
})

module.exports = router