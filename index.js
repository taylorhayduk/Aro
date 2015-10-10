var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
// var mongoose = require('mongoose');
  
// mongoose.connect('mongodb://localhost/SpeechChat', function(err) {
//     if(err) {
//         console.log('connection error', err);
//     } else {
//         console.log('connection successful');
//     }
// });
var lobby = {};
var liveGames = {};

var SwappingGame = function (players) {
  var gameID = players[0].gameID;
  //subscribe to new socket (should be on client side)
  // io.on('connection', function(socket){
  //   socket.join(gameID);
  // });

  io.to(gameID).emit('newTarget', [players[0].playerId, players[1]]);
  io.to(gameID).emit('newTarget', [players[1].playerId, players[0]]);

  console.log('SwappingGame is running!!!');

  //listen for target acquired to end game
  //io.on('targetAcquired')  
    //end game
};

var gameSettings = {
  SwappingGame: {min: 2, max: 2}
};

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', 'this is from the server. Joyce, Rod, Tisha, and Taylor are awesome!!');
  });

  // socket.on('gameEnter', function(player) {
  //   var gameID = player.gameID;
  //   if (player[newGame]) {
  //     lobby[gameID] = {players: [], gameType: player.newGame.gameType};
  //   }
  //   lobby.gameID.players.push(player);
  //   console.log(lobby);
  //   if (lobby[gameID].length === gameSettings[player.gameType].max) {
  //     io.emit('gameStart', gameID);
  //     liveGames[gameID] = new player.gameType(games[gameID]);
  //     delete lobby[gameID];
  //   }
  // });
});

http.listen(port, function(){
  console.log('listening on *:'+port);
});