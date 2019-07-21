const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    value: {
        type: String
    }
})

const message = new mongoose.model('message', messageSchema);

module.exports = message;