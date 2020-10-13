const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const connectDB = require("./config/database");

// loading configuration file from path
// "./config/config.env" to access environment
// variables such as PORT, NODE_ENV, etc. that
// can be used globally for various reasons
// including but not limited to segregating between
// production and development environments
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 8080; // loading PORT from .env

const app = express(); // initialising express app
connectDB(); // connection to mongodb database (refer "./config/databse.js")

// adding morgan as a middleware for logging if
// the server is being run in the develpment
// environment
if (process.env.NODE_ENV === "development") {
  console.log("Using morgan middleware for logging");
  app.use(morgan("dev"));
}

// handlebars for templating
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// adding the static folder
app.use(express.static(path.join(__dirname, "public")));

// adding routes
app.use("/", require("./routes/index"));

// initialising express app to listen to any
// incoming requests.
app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_ENV} environment; started at port ${PORT}`
  );
});
