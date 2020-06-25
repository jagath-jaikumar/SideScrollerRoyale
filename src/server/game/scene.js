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
     console.log('make a new dude: ' + playerName);
     this.players[clientId] = {
       playerName: playerName,
       clientId:clientId
     };
   });

   this.events.addListener('removePlayer', (clientId) => {
     console.log('a player left: ' + this.players[clientId].playerName);
     delete this.players[clientId];
   });


 }
 update(){


   var gameData = {players: this.players};
   this.roomManager.ioNspGame.in(this.roomId).emit('U', gameData);

 }
}
