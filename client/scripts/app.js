// $(function() {
//   // $('body').on('click', function() {
//   //   app.fetch();
//   // });
//   // $('#post').on('click', function() {
//   //   app.send();
//   // });
// });

var app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  username: window.location.search.substr(10),
  roomname: 'lobby',
  lastMessageId: 0

};
// var messageData = [];
app.init = function() {
  // get username
  this.username = window.location.search.substr(10);
  //cache jQuery selectors
  app.$message = $('#message');
  app.$chats = $('#chats');
  app.$roomSelect = $('#roomSelect');
  app.$send = $('#send');
};
  
// app.send = function(message) {
//   $.ajax({
//     // This is the url you should use to communicate with the parse API server.
//     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
//     type: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//       console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//       console.error('chatterbox: Failed to send message', data);
//     }
//   });
// };
  
app.fetch = function() {
  // $.ajax({
  //   url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  //   type: 'GET',
  //   // data: JSON.stringify(message),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     $('#chats').append('<div>' + data.results[0].username + ':' + '</div>', '<div>' + data.results[0].text + '</div>');
  //     console.log(data);    
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });
  $.ajax({
    url: app.server,
    type: 'GET',
    success: function(data) {
      // console.log(data);
      // if(!data.results || !data.result.length) {
      //   return;
      // }
      // //Store messages updaing the DOM if we have a new message
      // this.messages = data.results;
      // var mostRecentMessage = this.messages[this.messages.length - 1];
      // if (mostRecentMessage.objectId !== this.lastMessageId) {
      //   this.$chats.html('');

      //   for (var i = 0; i < this.messages.length; i++) {

      //     var $chat = $('<div class="chat"/>');
      //     var $username = $('<span class="username">' + this.messages[i].text + '</span>');
      //     $username.appendTo($chat);

      //     var $message = $('<br><span>' + this.messages[i].text + '<span>')
      //     $message.appendTo($chat);

      //     this.$chats.append($chat);
      //  }
      
    },

    error: function(error) {
      console.error(error);
    }
  });
};  
  
// app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  
app.renderMessage = function() {
     
};