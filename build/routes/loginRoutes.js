"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
var requireAuth = function (req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    else {
        res
            .status(403)
            .send("You must be <a href='/login'>Logged In</a> to watch this page");
    }
};
router.get('/', function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div> You are loggen in! </div>\n        <a href='/logout'>Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n    <div> Please <a href='/login'>Login</a> </div>\n    ");
    }
});
router.get('/logout', function (req, res) {
    if (req.session && req.session.loggedIn) {
        req.session = null;
    }
    res.redirect('/');
});
router.get('/login', function (req, res) {
    res.send("\n    <form method=\"POST\">\n      <div>\n        <label>Email</label>\n        <input type=\"text\" name=\"email\" />\n      </div>\n      <div>\n        <label>Password</label>\n        <input type=\"password\" name=\"password\" />\n      </div>\n      <button>SUBMIT</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        email === 'email@email.com' &&
        password === 'password') {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.status(422).send('Invalid email or password');
    }
});
router.get('/protected', requireAuth, function (req, res) {
    res.send('Welcome user!');
});
