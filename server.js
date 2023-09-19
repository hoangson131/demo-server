const express = require("express");
const app = express();
const port = 3030;

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routerUi = require("./ui/apiUi.js");

const accountRoutes = require('./routes/accountRoutes.js')

app.use(cookieParser());
// CORS policy settings
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
  //...
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Trả lời Hello World trên trang chủ:
app.use("/api/ui", routerUi);

app.use("/api/users", accountRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome Server!</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
