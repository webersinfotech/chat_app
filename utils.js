const {
    default_language
} = require('./config')
const FS = require('fs');

class Utils{
    constructor(){}

    load_message(language){
        if(!language) language = default_language;
        return JSON.parse(FS.readFileSync(`message/${language}.json`, 'UTF8'));
    }
}

module.exports = Utils;