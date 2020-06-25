var playerHandler = require('../game/playerHandler');

exports = module.exports = function(io){
  io.on('connection', function(socket){

    socket.on('newPlayer', function(data) {
        playerHandler.addPlayer(data.playerName);
    });


  });
}
