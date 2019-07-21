const express = require('express');
const Formats = require('./formats');
const mongo = require('./mongo');
const user = require('./route/user');
const agent = require('./route/agent');
const app = express();
const format = new Formats();
const server = require('http').createServer(app);

app.use(express.json());

app.use(express.static(__dirname + '/public/'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/html/chat.html');
})

//User related routing

app.use('/user', user);

//Agent related routing

app.use('/agent', agent);

server.listen(3000, () => {
    console.log('Application listening on 3000')
});

const IO = require('socket.io')(server);

IO.on('connection', (socket) => {

    socket.on('message', async (data) => {
        try{
            await mongo.store_message(format.create_message(data));
        }
        catch(Error){
            console.error(Error);
        }
    })

    socket.on('typing', () => {
        console.log("User is typing");
    })

    socket.on('disconnect', () => {
        console.log('Client got disconnected');
    })
})