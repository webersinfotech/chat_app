const mongoose = require('mongoose');
const {
    mongo_url,
    mongo_connection_option
} = require('./config');
const Utils = require('./utils');
const user = require('./models/user');
const agent = require('./models/agent');
const message = require('./models/message');
const session = require('./models/session');
const util = new Utils();

class Mongo{
    constructor(){
        (async () => {
            await this.connection();
            this.on_error();
        });
    }

    async connection(){
        return new Promise((res, rej) => {
            mongoose.connect(mongo_url, mongo_connection_option, (error, resposne) => {
                if(error) rej(error);
                res();
            })
        })
    }

    async on_disconnect(){
        const that = this;
        mongoose.connection.on('disconnected', async function(){
            await that.connection().catch((err) => {
                console.error(err);
                //util.send_error(err);
            });
        });
    }

    async on_error(){
        mongoose.connection.on('error', function(err){
            console.error(err);
            //util.send_error(err);
        });
    }

    //Before making any query make sure mongodb is connected if not then connect to mongodb.

    check_connection(){
        const that = this;
        return new Promise(async (res, rej) => {
            if(mongoose.connection.readyState === 0){
                await that.connection().then(() => {
                    res();
                }).catch(() => {
                    rej();
                });
            }
            res();
        });
    }

    store_user(data){
        const that = this;
        return new Promise((res, rej) => {
            that.check_connection().then(() => {
                user.create(data, (error, result) => {
                    if(error) rej(error);
                    res(result)
                })
            }).catch(() => {
                rej();
            })
        });
    }

    fetch_user(query){
        const that = this;
        return new Promise((res, rej) => {
            that.check_connection().then(() => {
                user.find(query, function(error, result){
                    if(error) rej(error);
                    res(result)
                })
            }).catch(() => {
                rej();
            })
        });
    }

    update_user(){
        const that = this;
        return new Promise((res, rej) => {});
    }

    delete_user(){
        const that = this;
        return new Promise((res, rej) => {});
    }

    store_agent(data){
        const that = this;
        return new Promise((res, rej) => {
            that.check_connection().then(() => {
                agent.create(data, (error, result) => {
                    if(error) rej(error);
                    res(result)
                })
            }).catch(() => {
                rej();
            })
        });
    }

    fetch_agent(query){
        const that = this;
        return new Promise((res, rej) => {
            that.check_connection().then(() => {
                agent.find(query, function(error, result){
                    if(error) rej(error);
                    res(result)
                })
            }).catch(() => {
                rej();
            })
        });
    }

    update_agent(){
        const that = this;
        return new Promise((res, rej) => {});
    }

    delete_agent(){
        const that = this;
        return new Promise((res, rej) => {});
    }

    store_message(data){
        const that = this;
        return new Promise((res, rej) => {
            that.check_connection().then(() => {
                message.create(data, (error, result) => {
                    if(error) rej(error);
                    res(result)
                })
            }).catch(() => {
                rej();
            })
        });
    }

    fetch_message(query){
        const that = this;
        return new Promise((res, rej) => {
            that.check_connection().then(() => {
                message.find(query, function(error, result){
                    if(error) rej(error);
                    res(result)
                })
            }).catch(() => {
                rej();
            })
        });
    }

    update_message(){
        const that = this;
        return new Promise((res, rej) => {});
    }

    delete_message(){
        const that = this;
        return new Promise((res, rej) => {});
    }

    store_session(data){
        const that = this;
        return new Promise((res, rej) => {
            session.create(data, (error, result) => {
                if(error) rej(error);
                res(result);
            })
        });
    }

    fetch_session(query){
        const that = this;
        return new Promise((res, rej) => {
            session.find(query, (error, result) => {
                if(error) rej(error);
                res(result);
            })
        });
    }

    delete_session(query){
        const that = this;
        return new Promise((res, rej) => {
            session.findOneAndRemove(query, (err, result) => {
                if(err) rej(err);
                res(result);
            })
        });
    }
}

module.exports = Mongo;