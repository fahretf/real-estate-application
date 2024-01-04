// generateHash.js

const bcrypt = require('bcrypt');

const plaintextPassword = 'qwert678';
const saltRounds = 10;

bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hash for known password:', hash);
    }
});