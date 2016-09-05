var express = require('express');
var router = express.Router();
var password = require("../utils/crypto");

router.route('/test/')
    .get((req, res, next) =>{
        res.render('test', {name: "Bob", age: 20});
    });

router.get('/get-pass', (req, res, next) => {
    var pass = password.hash("1234abc");
    res.json({ hash: pass, "1234abc": password.validate(pass, "1234abc"), "1234ab": password.validate(pass, "1234ab") });
});

module.exports = router;