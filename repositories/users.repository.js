const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    EmailAddress: String,
    FullName: String,
    Password: String,
    Username: String
});

const User = mongoose.model('AspNetUsers', UserSchema);



async function register(user, callback) {

    await User.collection("AspNetUsers").insertOne(user, function (res, err) {
        if (err) {
            callback(null, { message: 'Error occured while register' });
        }
        else{
            callback(res);
        }
    })
}

module.exports = {
    register: register,

}