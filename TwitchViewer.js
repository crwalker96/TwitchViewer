var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404"];
var streamerHTML = "";
function callTwitchAPI(user, callback) {
    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/'+ user 
              + '?callback=?',
        dataType: 'json',
        success: function(result) {
            callback(result, user);
        },
        error: function(xhRequest, ErrorText, thrownError) {
            callback({status: "404"}, user)
        }
    });
}
function getStreamerStatus(inputJSON) {
    if (inputJSON.error) {
        return ["No such user.", "http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png"];
    }
    else if (inputJSON.stream !== null) {
        return [inputJSON.stream.channel.status, inputJSON.stream.channel.logo]
    }
    else {
        return ["Offline", "http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_purple.png"];
    }
}
function processJSON (inputJSON, user) {
    var streamerStatusArray = getStreamerStatus(inputJSON);
    var streamerStatus = streamerStatusArray[0];
    var streamerImageURL = streamerStatusArray[1];
    var returnHTML = "";
    if (streamerStatus === "Offline" || streamerStatus === "No such user.") {
        returnHTML = '<div class="streamer-entry"><img class="streamer-image" src="'+streamerImageURL+'" /><p class="streamer-id"><a href="https://www.twitch.tv/'+user+'" target="_blank">'+user+'</a></p><p class="streamer-status">'+streamerStatus+'</p></div>';
    } else {
        returnHTML = '<div class="streamer-entry-online"><img class="streamer-image" src="'+streamerImageURL+'" /><p class="streamer-id"><a href="https://www.twitch.tv/'+user+'" target="_blank">'+user+'</a></p><p class="streamer-status">'+streamerStatus+'</p></div>';
    }
    /*$("#streamer-box").html(returnHTML);*/
    console.log(inputJSON);
    $("#streamer-box").append(returnHTML);
}
for (var i = 0; i < users.length; i++) {
    callTwitchAPI(users[i], processJSON);
}