const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const passport = require("passport");

router.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  }),
  userController.createSession
);

// router.get("/auth/logout", userController.destroySession);
router.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return;
    }
    // req.flash("success", "You have logged out");

    return res.redirect("http://localhost:3000");
  });
  res.redirect("http://localhost:3000");
});

module.exports = router;
