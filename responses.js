const utils = require('./utils');
const util = new utils();
const messages = util.load_message();

class Responses{
    constructor(){}

    server_error(){
        return {
            status: 500,
            message: messages.internal_server_error
        }
    }

    form_validation_failed(){
        return {
            status: 400,
            message: messages.form_validation_failed
        }
    }

    user_created(){
        return {
            status: 201,
            message: messages.user_successfully_created
        }
    }

    agent_created(){
        return {
            status: 201,
            message: messages.agent_successfully_created
        }
    }
}

module.exports = Responses;