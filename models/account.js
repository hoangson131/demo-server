const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vohoangson011218:%40Son0964869203@dbson.868yayf.mongodb.net/Demo-Shopee?retryWrites=true&w=majority')
  .then(() => console.log('Account Connected!'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String,
    infor: {
      type: String,
      ref: 'inforUser',
    }
}, {collection: 'Accounts'})

const inforUserSchema = new Schema({
  name: String,
  age: Number,
  address: String,
},{collection: 'inforUser'})

const AccountModel = mongoose.model('Accounts', AccountSchema)
const inforUserModel = mongoose.model('inforUser', inforUserSchema)

module.exports = AccountModel