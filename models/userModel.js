const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     userfirstname: {type: String, required: true},
     usersecondname: {type: String, required: true},
     email: {type: String, required: true},
     phnumber: {type: Number, required: true,},
     password: {type: String, required: true},
},{
     versionKey: false
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
