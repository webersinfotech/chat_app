const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    id: {
        type: String
    },
    socket_id: {
        type: String
    },
    receiver_id: {
        type: String
    },
    receiver_type: {
        type: String
    }
})

const session = new mongoose.model('session', sessionSchema);

module.exports = session;