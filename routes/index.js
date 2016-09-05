var express = require('express');
var router = express.Router();
var jwt = require("jsonwebtoken");
var User = require("../models/User");
var MSG = require("../resources/messages.json");

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'ngTodo' });
});

// ---------------------------------------------------------
// authenticate user and generate a new token
// ---------------------------------------------------------
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
// check token and do a request
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
