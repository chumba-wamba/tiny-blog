const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("connectDB");
const morgan = require("morgan");

// loading configuration file from path
// "./config/config.env" to access environment
// variables such as PORT, NODE_ENV, etc. that
// can be used globally for various reasons
// including but not limited to segregating between
// production and development environments.
dotenv.config("./config/config.env");
const PORT = process.env.PORT || 8080; // loading PORT from .env

const app = express(); // initialising express app
connectDB(); // connection to mongodb database (refer "./config/databse.js")
app.use(morgan("common"));

// initialising express app to listen to any
// incoming requests.
app.listen(PORT, (req, res) => {
  console.log(`Server running in ${process.env.NODE_ENV} started at ${PORT}`);
});
