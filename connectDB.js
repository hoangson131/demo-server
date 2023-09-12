const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Shopee-Demo')
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
  }, {collection: 'Account'});

  const inforUserSchema = new Schema({
    name: String,
    age: Number,
    address: String,
  },{collection: 'inforUser'})

  const courseSchema = new Schema({
    name: String,
    teacher: {
        type: String,
        ref: 'inforUser'
    },
    lesson: Number,
    coin: Number
  }, {collection: 'Course'})

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
  const AccountModel = mongoose.model('Account', accountSchema);
  const InforUserModel = mongoose.model('inforUser', inforUserSchema);
  const CourseModel = mongoose.model('Course', courseSchema);

  // ProductsModel.find({}, {collection: "Products"})
  // .then((data) => console.log(data))
  // .catch((err) => console.log(err))
