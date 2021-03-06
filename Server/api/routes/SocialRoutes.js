const router = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');

const noError = { status: 0, message: "No error" }
const CLIENT_SUCCESS_URL = "https://www.weddingspots.pk";
const CLIENT_FAILURE_URL = "https://www.weddingspots.pk/Login/Failure"

// Google

router.get("/google", passport.authenticate('google', { session: false, scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_FAILURE_URL,
}), (req, res) => {

    if (req.user) {
        const user = req.user;
        const theToken = jwt.sign({ user_id: user.user_id, type: user.type }, 'the-super-strong-secret', { expiresIn: '1h' });
        res.cookie('auth', theToken);
        res.redirect(CLIENT_SUCCESS_URL);
    }

    else {
        return res.status(400).json({ error: { status: 1, message: "Google login failed" }, data: {}, message: {} });
    }

});

// Facebook

router.get("/facebook", passport.authenticate('facebook', { session: false, scope: ["profile", "email"] }));

router.get("/facebook/callback", passport.authenticate("facebook", {
    session: false,
    failureRedirect: CLIENT_FAILURE_URL,
}), (req, res) => {

    if (req.user) {
        const user = req.user;
        const theToken = jwt.sign({ user_id: user.user_id, type: user.type }, 'the-super-strong-secret', { expiresIn: '1h' });
        res.cookie('auth', theToken);
        res.redirect(CLIENT_SUCCESS_URL);
    }

    else {
        return res.status(400).json({ error: { status: 1, message: "Facebook login failed" }, data: {}, message: {} });
    }

});

module.exports = router;




