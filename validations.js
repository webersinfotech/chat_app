const validate = require('node-input-validator');

class Validations{
    constructor(){}

    exec_validation(validator){
        return new Promise((res, rej) => {
            validator.check().then(function (matched) {
                if(!matched) rej();
                res();
            });
        })
    }

    validate_user(data){
        return new Promise(async (res, rej) => {
            const validator = new validate(data, {
                name: "required"
            })

            try{
                await this.exec_validation(validator);
                res();
            }
            catch(Error){
                rej();
            }
        })
    }

    validate_agent(data){
        return new Promise(async (res, rej) => {
            const validator = new validate(data, {
                name: "required"
            })

            try{
                await this.exec_validation(validator);
                res();
            }
            catch(Error){
                rej();
            }
        })
    }

    validate_message(data){
        return new Promise(async (res, rej) => {
            const validator = new validate(data, {
                value: "required"
            })

            try{
                await this.exec_validation(validator);
                res();
            }
            catch(Error){
                rej();
            }
        })
    }
}

module.exports = Validations;