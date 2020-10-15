const express = require("express");
const exphbs = require("express-handlebars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
  res.render("login.hbs", { layout: "login.hbs" });
});

router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard.hbs", { layout: "main.hbs" });
});

module.exports = router;
