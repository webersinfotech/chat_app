const FS = require('fs');

const host = "http://localhost"; //We are using this variable on error reporting so we know on which host error occures. It helpful when we are working on multiple env.

const mongo_url = "mongodb://localhost/chat";

const mongo_connection_option = {
    useNewUrlParser: true
}

const JWT_key = "11999966";

const default_language = "english";

const messages = JSON.parse(FS.readFileSync(`message/${default_language}.json`, 'UTF8'));

const sendgrid_key = "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";

const error_config = {
    to: 'webersinfotech@gmail.com',
    from: 'webersinfotech@gmail.com',
    subject: messages.error_subject,
    html: messages.error_message
}

module.exports = {
    host,
    mongo_url,
    mongo_connection_option,
    JWT_key,
    default_language,
    sendgrid_key,
    error_config
}