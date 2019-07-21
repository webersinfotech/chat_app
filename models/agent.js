const mongoose = require('mongoose');

const agentSchema = mongoose.Schema({
    name: {
        type: String
    },
    is_available: {
        type: Boolean,
        default: true
    }
})

const agent = new mongoose.model('agent', agentSchema);

module.exports = agent;