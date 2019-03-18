const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    EmailAddress: String,
    FullName: String,
    Password: String,
    Username: String
});

const User = mongoose.model('Users', UserSchema);



function register(user, callback) {
    var hashpassword = bcrypt.hashSync(user.Password, 10);
    user = new User({
        EmailAddress: user.EmailAddress,
        FullName: user.FullName,
        Password: hashpassword,
        Username: user.Username
    });
    user.save(function (err) {
        if (err) {
            callback(null, { message: err });
        } else {
            callback(user);
        }

    });
}

function login(username, password, callback) {
    User.find({ Username: username }).then(user => {
        if (user) {
            let isMatch = this.checkMatchPasswords(password, user[0].Password);
            if (isMatch) {
                callback(user);
            } else {
                callback(null, { message: 'The username or password is not correct' });
            }
        } else {
            callback(null, { message: 'The username or password is not correct' });
        }
    })
}

function checkMatchPasswords(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    register: register,
    login: login,
    checkMatchPasswords:checkMatchPasswords

}