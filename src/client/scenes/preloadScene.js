var io = require('socket.io-client');


module.exports = class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.setBaseURL('../assets/game/')
    this.load.image('player', 'sprites/SpriteCircle.png')
    this.load.image('ground', 'tiles/platform.png');
  }

  create() {
    let socket = io();

    socket.on('connect', () => {
      console.log("You're connected to socket.io");


      this.scene.start('MenuScene', { socket });
    });
  }
}
