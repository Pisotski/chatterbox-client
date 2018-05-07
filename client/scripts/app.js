
$(document).ready(function() {

  var ourMessage;
  $('#post').on('click', function() {
    ourMessage = $('#field').val();
    ourMessage = app.convertMessage(ourMessage, app.username);
    app.send(ourMessage);
    $('#field').val('');
  });
  
  $('#roomSelect').change( function() {
    $( "select option:selected" ).each(function() {
      app.selectedRoom = $( this ).attr('id');
      app.lastDate = null;
      app.clearContainer( '#chats' );
    });
  });

  $('#clear').on('click', function() {
    app.clearContainer('#chats');
  });
    
  setInterval(app.fetch, 500);
});

var app = {
  init: function() {},
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  username: window.location.search.substr(10),
  roomnames: [],
  selectedRoom: 'default',
  messages: [],
  lastDate: null
};
 
app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order: '-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      app.allRooms(data);
      app.renderMessage(app.filterMessagesByRoomName(data));
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};  
 
app.renderMessage = function(messages) {
  
  if( !app.lastDate ) {
      app.lastDate = new Date(messages[0].createdAt);
    messages.forEach(function(msg){
      $("#chats").append('<div class="chat">' + msg.username + ': ' + msg.text + '</div>');
  });  
  } else {
    var currDate = new Date(messages[0].createdAt);
    if(currDate > app.lastDate) {
      $("#chats").prepend('<div class="chat">' + msg.username + ': ' + msg.text + '</div>');
      app.lastDate = currDate;
    }
  }
};

app.convertMessage = function(message, username, roomname) {
  var output = {
    username: username,
    text: message,
    roomname: app.selectedRoom
  }
  return output;
};

app.clearContainer = function(id) {
  $(id).empty();
}

app.filterMessagesByRoomName = function(data) {
    return data.results.filter(function(msg){
    return msg.roomname === app.selectedRoom;
    });
  }
//sort results by roomname
app.allRooms = function(data) {
  var roomNames = {};
    data.results.forEach(function(msg){
      roomNames[msg.roomname] = true;
  });
  for (var key in roomNames) {
    if (app.roomnames.indexOf(key) === -1) {
      app.roomnames.push(key);
      $('#roomSelect').append($('<option class="room" id="'+ key + '"/>').text(key));
    }
  }
}




