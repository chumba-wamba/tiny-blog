const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const User = require("../models/User");
const Story = require("../models/Story");

router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add.hbs");
});

router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("error/500");
  }
});

router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();
    // console.log(stories);
    res.render("stories/index", {
      stories,
      _id: req.user.id,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({ _id: req.params.id }).lean();
    if (!story) {
      res.render("/errors/404.hbs");
    }

    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      console.log(story);
      res.render("stories/edit", { story });
    }
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
