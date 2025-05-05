const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Signup Routes
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// Login Routes
router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        savedRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true
        }),
        userController.login
    );

// Logout Route
router.get("/logout", userController.logout);

module.exports = router;
