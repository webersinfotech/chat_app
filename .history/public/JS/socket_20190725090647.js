$(function(){
    //Storing socket in socket variable
    let socket;
    //socket connect to following url.
    let socket_url = "http://localhost:3000";
    //Get URL address
    const URL = $(location).attr("href");
    //get sender ID and type
    const sender_id = URL.indexOf('?') === -1 ? URL.split('/').pop() : URL.split('/').pop().split('?')[1];
    const sender_type = URL.indexOf('?') === -1 ? URL.split('/').pop() : URL.split('/').pop().split('?')[0];

    socket = io.connect(socket_url, {
        transports: ['websocket'],
        query: `id=${sender_id}&type=${sender_type}`,
    });

    // $('#msg_text').on('keyup', function(event){
    //     event.preventDefault();
    //     socket.emit('typing');
    // });

    $('#send_msg').on('click', function(event){
        event.preventDefault();
        socket.emit('message', {
            message: $("#msg_text").val()
        });
    })

    socket.on('message', funmction(data){
        console.log(data);
    })
});