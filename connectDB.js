const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vohoangson011218:@Son0964869203@dbson.868yayf.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err));

  const Schema = mongoose.Schema;   
  
  const accountSchema = new Schema({
    username: String,
    password: String,
  }, {collection: 'Accounts'});

  const AccountModel = mongoose.model('Accounts', accountSchema);
