const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://vohoangson011218:@Son0964869203@dbson.868yayf.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'))
  .catch((err) => console.log(err));

  const Schema = mongoose.Schema;   
  
  const accountSchema = new Schema({
    username: String,
    password: String,
    infor: {
        type: String,
        ref: 'inforUser'
    },
    course: {
        type: String,
        ref: 'Course'
    }
  }, {collection: 'Accounts'});

  const inforUserSchema = new Schema({
    name: String,
    age: Number,
    address: String,
  },{collection: 'inforUser'})

  const productsSchema = new Schema({
    "productID": Number,
    "nameProduct": String,
    "description": String,
    "imgUrl": [],
    "rate": Number,
    "sold": Number,
    "reviewNumber": Number,
    "like": Number
  },{collection: 'Products'})

  const ProductsModel = mongoose.model('Products', productsSchema)
  const AccountModel = mongoose.model('Accounts', accountSchema);
  const InforUserModel = mongoose.model('inforUser', inforUserSchema);

  // ProductsModel.find({}, {collection: "Products"})
  // .then((data) => console.log(data))
  // .catch((err) => console.log(err))
