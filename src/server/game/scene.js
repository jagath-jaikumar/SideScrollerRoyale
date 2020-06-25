var constants = require('../../constants.js')

module.exports = class MainScene extends Phaser.Scene {
  constructor() {
   super({ key: 'MainScene'});
   // see all scene plugins:
   // Phaser.Plugins.DefaultScene
   // https://github.com/photonstorm/phaser/blob/master/src/plugins/DefaultPlugins.js#L76
 }
 init(){
   const { roomId, roomManager } = this.game.config.preBoot()
   this.roomId = roomId;
   this.roomManager = roomManager;

 }
 create(){

   this.players = {};

   this.events.addListener('createPlayer', (clientId, socketId, playerName) => {
     this.players[clientId] = {
       playerName: playerName,
       clientId:parseInt(clientId),
       x:400,
       y:constants.WORLD_HEIGHT-200,
       angle:0,
     };

     this.roomManager.ioNspGame.in(this.roomId).emit('CurrentPlayers', this.players);

  //   this.roomManager.ioNspGame.in(this.roomId).emit('NewPlayer', this.players[clientId]);

   });

   this.events.addListener('removePlayer', (clientId) => {
     delete this.players[clientId];
     this.roomManager.ioNspGame.in(this.roomId).emit('DestroyPlayer', clientId);

   });

   this.events.addListener('UpdateServer', (indivPlayerData) => {
     this.players[indivPlayerData.clientId].x = indivPlayerData.x;
     this.players[indivPlayerData.clientId].y = indivPlayerData.y;
     this.players[indivPlayerData.clientId].angle = indivPlayerData.angle;
   });


 }
 update(){


   var gameData = {players: this.players};
   this.roomManager.ioNspGame.in(this.roomId).emit('UpdateClient', gameData);




 }
}
