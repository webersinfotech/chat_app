const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String
    }
})

const user = new mongoose.model('user', userSchema);

module.exports = user;