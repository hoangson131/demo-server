const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Shopee-Demo')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    infor: {
      type: String,
      ref: 'inforUser',
    }
}, {collection: 'Account'})

const inforUserSchema = new Schema({
  name: String,
  age: Number,
  address: String,
},{collection: 'inforUser'})

const AccountModel = mongoose.model('Account', AccountSchema)
const inforUserModel = mongoose.model('inforUser', inforUserSchema)

module.exports = AccountModel