var io = require('socket.io-client');


module.exports = class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    
  }

  create() {
    let socket = io();

    socket.on('connect', () => {
      console.log("You're connected to socket.io");


      this.scene.start('MenuScene', { socket });
    });
  }
}
