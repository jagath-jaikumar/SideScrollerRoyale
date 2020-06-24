exports = module.exports = function(io){
  io.on('connection', function(socket){

    socket.on('newPlayer', function(data) {
        console.log(data.playerName);
    });


  });
}
