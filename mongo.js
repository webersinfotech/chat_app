const mongoose = require('mongoose');
const {
    mongo_url,
    mongo_connection_option
} = require('./config');
const user = require('./models/user');
const agent = require('./models/agent');
const message = require('./models/user');

mongoose.connect(mongo_url, mongo_connection_option, (error, resposne) => {
    if(error) throw new Error(error);
    console.log('Mongodb connected');
})

function store_user(data){
    return new Promise((res, rej) => {
        user.create(data, (error, result) => {
            if(error) rej(error);
            res(result)
        })
    });
}

function fetch_user(query){
    return new Promise((res, rej) => {
        user.find(query, function(error, result){
            if(error) rej(error);
            res(result)
        })
    });
}

function update_user(){
    return new Promise((res, rej) => {});
}

function delete_user(){
    return new Promise((res, rej) => {});
}

function store_agent(data){
    return new Promise((res, rej) => {
        agent.create(data, (error, result) => {
            if(error) rej(error);
            res(result)
        })
    });
}

function fetch_agent(query){
    return new Promise((res, rej) => {
        agent.find(query, function(error, result){
            if(error) rej(error);
            res(result)
        })
    });
}

function update_agent(){
    return new Promise((res, rej) => {});
}

function delete_agent(){
    return new Promise((res, rej) => {});
}

function store_message(data){
    return new Promise((res, rej) => {
        message.create(data, (error, result) => {
            if(error) rej(error);
            res(result)
        })
    });
}

function fetch_message(query){
    return new Promise((res, rej) => {
        message.find(query, function(error, result){
            if(error) rej(error);
            res(result)
        })
    });
}

function update_message(){
    return new Promise((res, rej) => {});
}

function delete_message(){
    return new Promise((res, rej) => {});
}

module.exports = {
    store_user,
    fetch_user,
    update_user,
    delete_user,
    store_agent,
    fetch_agent,
    update_agent,
    delete_agent,
    store_message,
    fetch_message,
    update_message,
    delete_message
};