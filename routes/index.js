const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Story = require("../models/Story");

router.get("/", ensureGuest, (req, res) => {
  res.render("login.hbs", { layout: "login.hbs" });
});

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    stories = await Story.find({ user: req.user.id }).lean();
    // console.log(stories);
    res.render("dashboard.hbs", {
      layout: "main.hbs",
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    console.error(error);
    res.render("error/500.hbs");
  }
});

module.exports = router;
