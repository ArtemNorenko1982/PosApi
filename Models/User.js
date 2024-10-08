const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    userName: String,
    password: String,
    email: String,
    createdAt: String,
    passwordHash: String
});

module.exports = model('User', userSchema);
