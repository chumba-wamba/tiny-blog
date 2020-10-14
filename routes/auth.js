const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate(
    "google",
    {
      failureRedirect: "/",
    },
    (req, res) => res.redirect("/dashboard")
  )
);

router.get("/github", passport.authenticate("github"));

router.get(
  "/github/callback",
  passport.authenticate(
    "github",
    {
      failureRedirect: "/",
    },
    (req, res) => res.redirect("/dashboard")
  )
);

module.exports = router;
