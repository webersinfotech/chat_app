$(function(){
    //Storing socket in socket variable
    let socket;
    //socket connect to following url.
    let socket_url = "http://localhost:3000";

    socket = io.connect(socket_url, {
        transports: ['websocket']
    });

    $('#msg_text').on('keyup', function(event){
        event.preventDefault();
        socket.emit('typing');
    });

    $('#send_msg').on('click', function(event){
        event.preventDefault();
        socket.emit('message', {
            message: $("#msg_text").val()
        });
    })
});