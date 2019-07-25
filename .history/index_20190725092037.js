global.__basedir = __dirname;

const express = require('express');
const Formats = require('./formats');
const Utils = require('./utils');
const Mongos = require('./mongo');
const Queries = require('./queries');
const user = require('./route/user');
const agent = require('./route/agent');
const app = express();
const format = new Formats();
const util = new Utils();
const mongo = new Mongos();
const query = new Queries();
const server = require('http').createServer(app);

process.on('unhandledRejection', (Error) => {
    console.error(Error);
    //util.send_error(Error);
})

process.on('uncaughtException', (Error) => {
    console.error(Error);
    //util.send_error(Error);
})

app.use(express.json());

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/chat.html');
})

//Basepath for user

app.get('/user', async function(req, res){
    const users = await mongo.fetch_user({});
    if(users.length <= 0){
        res.redirect('user/create');
        return;
    }
    if(typeof req.query.id === 'undefined' && typeof req.query.type === 'undefined'){
        res.redirect(`user?type=user&id=${users[0]._id}`);
        return;
    }
    res.sendFile(`${__basedir}/public/html/chat.html`);
});

//Basepath for agent

app.get('/agent', async function(req, res){
    const agents = await mongo.fetch_agent({});
    if(agents.length <= 0){
        res.redirect('agent/create');
        return;
    }
    if(typeof req.query.id === 'undefined' && typeof req.query.type === 'undefined'){
        res.redirect(`agent?type=agent&id=${agents[0]._id}`);
        return;
    }
    res.sendFile(`${__basedir}/public/html/chat.html`);
});

//User related routing

app.use('/user', user);

//Agent related routing

app.use('/agent', agent);

server.listen(3000, () => {
    console.log('Application listening on 3000')
});

const IO = require('socket.io')(server);

IO.on('connection', async (socket) => {

    if(socket.handshake.query['type'] === 'agent'){
        const sessions = await mongo.fetch_session(query.fetch_session(socket.id));
        const users = await mongo.fetch_user({});
        if(users.length >= 1 && sessions.length <= 0){
            const data = {
                id: socket.handshake.query['id'],
                socket_id: socket.id,
                receiver_id: users[0]._id,
                receiver_type: "user"
            }

            await mongo.store_session(data);
        }
    }
    else{
        const sessions = await mongo.fetch_session(query.fetch_session(socket.id));
        const agents = await mongo.fetch_agent({});
        if(agents.length >= 1 && sessions.length <= 0){
            const data = {
                id: socket.handshake.query['id'],
                socket_id: socket.id,
                receiver_id: agents[0]._id,
                receiver_type: "agent"
            }

            await mongo.store_session(data);
        }
    }

    socket.on('message', async (data) => {
        try{
            const session_data = 
            await mongo.store_message(format.create_message(data));
            console.log(receiver_session[0].socket_id);
            socket.to(receiver_session[0].socket_id).emit('message', data)
        }
        catch(Error){
            console.error(Error);
            //util.send_error(Error);
        }
    })

    socket.on('typing', async () => {
        console.log("User is typing");
    })

    socket.on('disconnect', async () => {
        try{
            await mongo.delete_session(query.destroy_session(socket.id));
        }
        catch(Error){
            console.log(Error);
        }
    })
})

function receiver_data(socket_id){
    return new Promise((res, rej) => {
        const session_data = await mongo.fetch_session(query.fetch_session(socket_id));
        if(session_data.length <= 0) rej();
        const receiver_session = await mongo.fetch_session(query.fetch_receiver_session(session_data[0].receiver_id));
        if(receiver_session.length <= 0) rej();
        res({
            session_data: session_data,
            receiver_session: receiver_session
        })
    })
}