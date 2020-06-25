var constants = require('../../constants')
var uuid = require('uuidv4').uuid;

var Game = require('../game/game').Game;

module.exports = class RoomManager {
  rooms = {};

  constructor(ioNspGame) { //SockertIO.namespace
    this.ioNspGame = ioNspGame;
    setInterval(() => {
      this.removeInactiveRooms()
    }, 10000)
  }

  generateClientId(socket) {
    let clientId = Math.floor(Math.random()*100000)
    socket.clientId = clientId
    socket.emit('clientId', clientId)
  }

  async joinRoom(socket, scene, playerName) {
    if (typeof scene !== 'string') {
      console.error('level or scene is not defined in socketGame.ts');
      return
    }
    socket.room = this.chooseRoom(scene);

    // create a new game instance if this room does not exist yet
    if (!this.rooms[socket.room]) {
      await this.createRoom(socket.room, socket, scene);
    }

    this.addUser(socket, playerName);


    this.rooms[socket.room].scene.events.emit('createPlayer', socket.clientId, socket.id, playerName)

  }

  chooseRoom = (scene) => {

    let rooms = Object.keys(this.rooms);

    if (rooms.length === 0) return uuid();

    // check for the next room with 1 or more free spaces
    let chosenRoom = null;
    for (let i = 0; i < Object.keys(this.rooms).length; i++) {
      let room = this.rooms[rooms[i]];
      let count = Object.keys(room.users).length;
      if (
        count < constants.MAX_PLAYERS_PER_ROOM &&
        room.sceneKey === scene &&
        !this.isRemoving(rooms[i])
      ) {
        chosenRoom = rooms[i];
        break;
      }
    }
    if (chosenRoom) return chosenRoom;

    // create a new room with a new uuidv4 id
    return uuid();
  }

  async createRoom (roomId, socket,scene)  {

    let game = await Game(this, roomId);
     this.rooms[roomId] = {
       sceneKey: scene,
       roomId: roomId,
       users: {},
       removing: false,
       game:game,
       scene: game.scene.keys['MainScene']
     }
 }


 addUser(socket, playerName) {
    let newUsers = {
      [socket.id]: {
        roomId: socket.room,
        lastUpdate: Date.now(),
        clientId: socket.clientId,
        id: socket.id,
        name: playerName
      }
    }

    this.rooms[socket.room].users = {
      ...this.rooms[socket.room].users,
      ...newUsers
    }
    // join the socket room
    socket.join(socket.room)
  }

 leaveRoom(socket) {
    if (this.isRemoving(socket.room)) return
    this.rooms[socket.room].scene.events.emit('removePlayer', socket.clientId)
  }

  removeUser(roomId, userId) {
    if (this.userExists(roomId, userId)) {
      delete this.rooms[roomId].users[userId]
      return true
    }
    return false
  }

    /** Check if this user exists */
 userExists(roomId, userId) {
   if (this.roomExists(roomId) && this.rooms[roomId].users && this.rooms[roomId].users[userId]) return true
   return false
 }

 /** Check if this room exists */
 roomExists(roomId) {
   if (this.rooms && this.rooms[roomId]) return true
   return false
 }

  getRoomsArray() {
    let rooms = []
    Object.keys(this.rooms).forEach((roomId) => {
      rooms.push(this.rooms[roomId])
    })
    return rooms
  }

  getAllUsersArray() {
    let users = []
    Object.keys(this.rooms).forEach((roomId) => {
      Object.keys(this.rooms[roomId].users).forEach((userId) => {
        users.push(this.rooms[roomId].users[userId])
      })
    })
    return users
  }

  removeInactiveRooms() {
    this.getRoomsArray().forEach((room) => {
      if (!room.users || Object.keys(room.users).length === 0) this.removeRoom(room.roomId)
    })
  }

  isRemoving(roomId) {
    if (!!!this.rooms[roomId] || this.rooms[roomId].removing) return true
    else return false
  }

}
