var express = require('express');
var router = express.Router();
var password = require("../password");
var jwt = require("jsonwebtoken");
var User = require("../models/User");
var MSG = require("../bin/messages.json");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'ngTodo' });
});

router.route('/test/')
  .get((req, res, next) =>{
    res.render('test', {name: "Bob", age: 20});
});

router.get('/get-pass', (req, res, next) => {
    var pass = password.hash("1234abc");
    res.json({ hash: pass, "1234abc": password.validate(pass, "1234abc"), "1234ab": password.validate(pass, "1234ab") });
});

router.post('/authenticate', function(req, res) {
    User.findOne({
        name: req.body.name
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: MSG.token.USER_NOT_FOUND });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({ success: false, message: MSG.token.WRONG_PASSWORD });
            } else {
                res.json(jwt.sign(user, "NmzXaVUWpAaZLnq4lpsy_HlV6GqW2leOkOqyrvYku-U", { expiresIn: 86400 }));
            }
        }
    });
});

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use('/api', function(req, res, next) {
    var token = req.body.token || req.params['token'] || req.get('Authorization');
    if (token) {
        jwt.verify(token, "NmzXaVUWpAaZLnq4lpsy_HlV6GqW2leOkOqyrvYku-U", function (err, decoded) {
            if (err) return res.status(401).send({error: MSG.token.TOKEN_VERIFICATION_FAILED});
            req.decoded = decoded;
            next()
        })
    } else {
        return res.status(403).send({sucess: false, message: MSG.token.NO_TOKEN_PROVIDED})
    }
});

module.exports = router;
