const express = require('express');
const router = express.Router();
const passport = require('passport');

// Auth Routes
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure'
}), (req, res) => {
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        // Redirect to Google's logout URL
        res.redirect('https://accounts.google.com/Logout');
    });
});

router.get('/failure', (req, res) => {
    res.send('Failed to authenticate...');
});

module.exports = router;
