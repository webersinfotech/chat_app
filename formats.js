const JWT = require('jsonwebtoken');
const {
    JWT_key
} = require('./config')

class Formats{
    constructor(){}

    create_user(data){
        return {
            name: data.name
        }
    }

    create_agent(data){
        return {
            name: data.name
        }
    }

    create_message(data){
        return {
            value: JWT.sign(data.message, JWT_key)
        }
    }
}

module.exports = Formats;