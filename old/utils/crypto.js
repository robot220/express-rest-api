const crypto = require('crypto');
const appCfg = require('../config.json');

var SaltLength = appCfg.security.passwordSaltLength;

function createHash(value) {
    var salt = generateSalt(SaltLength);
    var hash = md5(value + salt);
    return salt + hash;
}

function validateHash(hash, value) {
    var salt = hash.substr(0, SaltLength);
    var validHash = salt + md5(value + salt);
    return hash === validHash;
}

function generateSalt(len) {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
        setLen = set.length,
        salt = '';
    for (var i = 0; i < len; i++) {
        var p = Math.floor(Math.random() * setLen);
        salt += set[p];
    }
    return salt;
}

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

module.exports = {
    'hash': createHash,
    'validate': validateHash
};