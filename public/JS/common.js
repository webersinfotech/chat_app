function post_request(URL, data, callback){
    $.ajax({
        method: "POST",
        url: URL,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            callback(response);
        },
        error: function(response){
            console.log(response);
        }    
    });
}