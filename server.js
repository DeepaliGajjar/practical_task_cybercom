const express = require("express");
const app = express();
const port = 30006; // port listen
const bodyParsers = require('body-parser');
// use env
require("dotenv").config();

app.use(bodyParsers.json());

//db connection
const mongoose = require("mongoose");
const dburl = process.env.dburl;

let db = mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('DB connected');
}).catch(exception => {
  console.log(exception);
})
//use routes
let routes = require('./routes/routes')
app.use(routes)

//server listening
app.listen(port, () => {
  console.log("Server listening on :", port);
});
