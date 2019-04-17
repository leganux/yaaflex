const express = require('express');
const router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');


passport.use(new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',

},
    function (username, password, done) {
        Admin.findOne({ username: username }, function (err, admin) {
            if (err) { return done(err); }
            if (!admin) { return done(null, false); }
            bcrypt.compare(password, admin.password, function (err, res) {
                if (err) {
                    return done(null, false);
                }
                if (!res) {
                    return done(null, false);
                }
                admin.isAdmin = true;
                done(null, { session: admin, prop: { isAdmin: true } });
            });
        });
    }
));


router.post('/', passport.authenticate('local', { failureRedirect: '/lx_admin', failWithError: true }),
    function (req, res) {
        res.redirect('/lx_admin/dashboard');
    });


module.exports = router;