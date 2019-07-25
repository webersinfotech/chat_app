const {
    default_language,
    sendgrid_key,
    host,
    error_config
} = require('./config')
const FS = require('fs');
const util = require('util');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sendgrid_key);

class Utils{
    constructor(){}

    load_message(language){
        if(!language) language = default_language;
        return JSON.parse(FS.readFileSync(`message/${language}.json`, 'UTF8'));
    }

    send_error(Error_message){
        const message = {
            to: error_config.to,
            from: error_config.from,
            subject: error_config.subject,
            html: util.format(error_config.html, host, Error_message)
        }

        sgMail.send(message, (error, result) => {
            if(error) console.error(error);
        })
    }
}

module.exports = Utils;