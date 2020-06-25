var roomManager = require('../managers/roomManager.js');

module.exports = class SocketGame {
  constructor(io, roomManager) {
    io.on('connection', async (socket) => {
      roomManager.generateClientId(socket);
      socket.on('joinRoom', async (data) => {
        const { scene, playerName} = data
        await roomManager.joinRoom(socket, scene, playerName)
      });



      socket.on('disconnect', () => {
        //console.log('someone left');
        roomManager.leaveRoom(socket)
      })



    })

  }
}
