var roomManager = require('../managers/roomManager.js');

module.exports = class SocketGame {
  constructor(io, roomManager) {
    io.on('connection', async (socket) => {
      roomManager.generateClientId(socket);
      socket.on('joinRoom', async (data) => {
        const { scene, playerName} = data
        await roomManager.joinRoom(socket, scene, playerName)
      });


      socket.on('UpdateServer', (indivPlayerData) => {
        if (roomManager.isRemoving(socket.room)) return
        if (!roomManager.userExists(socket.room, socket.id)) return

        roomManager.rooms[socket.room].scene.events.emit('UpdateServer',indivPlayerData);
      });


      socket.on('disconnect', () => {
        //console.log('someone left');
        roomManager.leaveRoom(socket)
      })

    })

  }
}
