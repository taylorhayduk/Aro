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
  io.emit('gameStart', 'in SwappingGame function');
  // var gameID = players[0].gameID;
  //subscribe to new socket (should be on client side)
  // io.on('connection', function(socket){
  //   socket.join(gameID);
  // });

  // io.to(gameID).emit('newTarget', [players[0].playerId, players[1]]);
  // io.to(gameID).emit('newTarget', [players[1].playerId, players[0]]);

  // console.log('SwappingGame is running!!!');

  //listen for target acquired to end game
  //io.on('targetAcquired')  
    //end game
};

var gameSettings = {
  SwappingGame: {func: SwappingGame, min: 2, max: 2}
};

io.on('connection', function(socket){
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
  // socket.on('chat message', function(msg){
  //   console.log('message: ' + msg);
  // });
  // socket.on('chat message', function(msg){
  //   io.emit('chat message', 'this is from the server. Joyce, Rod, Tisha, and Taylor are awesome!!');
  // });


  socket.on('gameEnter', function(player) {
    var gameID = player.gameID;
    var newGame = player.newGame;
    if (newGame) {
      io.emit('gameStart', 'making game...');
      lobby[gameID] = {players: [], gameType: player.newGame.gameType};
    }
    lobby[gameID].players.push(player);

    var gameType = lobby[gameID].gameType;

    // io.emit('gameStart', 'number of player in lobby: '+lobby[gameID].players.length);
    // io.emit('gameStart', 'gameType: ' +gameType);
    // io.emit('gameStart', 'max in game: ' +gameSettings[gameType].max);
    if (lobby[gameID].players.length === gameSettings[gameType].max) {
      io.emit('gameStart', 'we are at max capacity!!');
      // liveGames[gameID] = new SwappingGame(lobby[gameID].players);
      liveGames[gameID] = new gameSettings[gameType].func((lobby[gameID].players));
      delete lobby[gameID];
      io.emit('gameStart', 'lobby: ');
      io.emit('gameStart', lobby);
      io.emit('gameStart', 'liveGames:');
      io.emit('gameStart', liveGames);
    }
  });



});

http.listen(port, function(){
  console.log('listening on *:'+port);

});

// var gameID = 'gameID';
// lobby[gameID] = {players: []};
// lobby[gameID].players.push('player1');
// console.log(lobby);