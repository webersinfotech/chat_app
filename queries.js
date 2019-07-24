class Queries{
    constructor(){}

    fetch_agent_by_availibilty(){
        
    }

    destroy_session(socket_id){
        return {
            socket_id: socket_id
        }
    }

    fetch_session(socket_id){
        return {
            socket_id: socket_id
        }
    }

    fetch_receiver_session(receiver_id){
        return {
            id: receiver_id
        }
    }
}

module.exports = Queries;