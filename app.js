const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const mongoose = require("mongoose");
const moment = require("moment");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/database"); // config for database connection

// loading configuration file from path
// "./config/config.env" to access environment
// variables such as PORT, NODE_ENV, etc. that
// can be used globally for various reasons
// including but not limited to segregating between
// production and development environments
dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

// adding oauth strategies
require("./config/google_passport")(passport);
require("./config/github_passport")(passport);

// connection to the database using config
connectDB();

// initialising an express app
app = express();

// adding body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// adding morgan middleware for logging
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log("Using morgan middleware (dev) for logging");
}

// helpers for handlebars
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

// initialising express-handlebars for templating
app.engine(
  ".hbs",
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: "main.hbs",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// adding middleware for session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// adding middleware for passport
app.use(passport.initialize());
app.use(passport.session());

// adding middleware to make "user" global
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  return next();
});

// adding public directory for assets
app.use(express.static(path.join(__dirname, "public")));

// adding routes for "/..." endpoints
app.use("/", require("./routes/index.js"));

// adding routes for "/auth/..." endpoints
app.use("/auth", require("./routes/auth.js"));

// adding routes for "/stories/..." endpoints
app.use("/stories", require("./routes/stories.js"));

// initialising express app to listen to
// any incoming requests
app.listen(PORT, (req, res) => {
  console.log(`Server running in ${NODE_ENV} at port: ${PORT}`);
});
