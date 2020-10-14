const express = require("express");
const exphbs = require("express-handlebars");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login.hbs", { layout: "login.hbs" });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard.hbs", { layout: "main.hbs" });
});

module.exports = router;
