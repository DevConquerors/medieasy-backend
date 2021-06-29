/************** CORE MODULES **************/
const path = require("path");

/************** NPM MODULES  **************/
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

/************** EXPRESS SETUP ************/
const app = express();

/*********** FILE STORAGE SETUP **********/
const fileStorage = multer.diskStorage({
  destination: (req, fille, cb) => {
    cb(null, "assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});

/************** PARSER SETUP *************/
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage }).single("image"));

/************** CORS SETUP ***************/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

/********** STATIC FOLDER SETUP **********/
app.use(express.static(path.join(__dirname, "assets")));

/************* ROUTES SETUP **************/

/****** EROOR HANDLING MIDDLEWARE  *******/
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data,
  });
});

/******** 404 MIDDLEWARE *********/
app.use((req, res, next) => {
  res.status(404).json({
    message: "resourse not found",
  });
});

/*********** PORT AND DB SETUP **********/
// mongoose
//   .connect(process.env.DB_URL, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then((result) => {
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
//   })
//   .catch((err) => console.log(err));
