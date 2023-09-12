
const express = require('express')
var app = express()
const port = 3030

const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routerUi = require('./ui/apiUi.js')
const bcrypt = require('bcryptjs')
var salt = bcrypt.genSaltSync(10)

const AccountModel = require('./models/account')

app.use(cookieParser())
// CORS policy settings 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next()
  //...
 })


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Trả lời Hello World trên trang chủ:
app.use('/api/ui', routerUi);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
})

var accountRouter = require('./routers/account')
app.use('/api/account', accountRouter)


// function to handle Token
function generateToken(user) {
  const payload = {
    userid: user.id,
    username: user.username,
  };
  // const options = {
  //   expiresIn: 60,
  // };
  const token = jwt.sign(payload, 'secret', {expiresIn: 60});
  return token;
}
//===========GET Login ================================================================
app.get('/login',(req, res, next) => {
  try {
    const token = req.cookies;
    console.log(token);
    // res.redirect('/login')
  } catch (error) { 
    res.json("ban can phai login")
  }
})

//===========POST Login ==================================================================
app.post('/login', (req, res, next) => {
  const {username, password} = req.body
  AccountModel.findOne({
    username: username,
  })
  .then((user) => {
    if(user && bcrypt.compareSync(password, user.password)){
      console.log(user, "line 75");
      const token = generateToken(user)
      console.log(token);
      res.status(200).json({
          message: "dang nhap thanh cong",
          token: token
      })
      return user
    } else {
      res.status(401).json({message: 'Invalid credentials'});
    }
  })
  .catch((err) => res.status(500).json(err))
})

//============POST REGISTER================================================================
app.post('/register', (req, res, next)=> {
  const user = req.body
  console.log(req.body);
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash;

  AccountModel.findOne({
    username: user.username
  })
  .then((userOld) => {
    if(userOld) {
      return res.json("Account đã tồn tại")
    } else {
      AccountModel.create(user)
          .then((newUser) => {
              console.log(newUser);
                // const token = generateToken(newUser);
            res
              .status(200)
              .json("Tao thanh cong")
              // .json({create_user: newUser,token: token, user_id: newUser.id})
            })
    }
  })
  .catch((err) => {
    res.status(500).json({
      message: "There was an error adding a user to the database",
      err
    })
  })
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})