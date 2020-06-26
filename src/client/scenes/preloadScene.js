var io = require('socket.io-client');


module.exports = class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.setBaseURL('../assets/game/')
    this.load.image('player', 'sprites/SpriteCircle.png')
    this.load.image('ground', 'tiles/platform.png');

    this.load.image('groundtiles', 'tiles/groundTiles.png');
    this.load.tilemapTiledJSON("map", "tiles/map.json");
  }

  create() {
    const url = `${location.origin}/G`

    let socket = io.connect(url, { transports: ['websocket'] })

    socket.on('connect', () => {
      console.log("connected");
    });

     socket.on('clientId', (clientId) => {
      socket.clientId = clientId
      console.log('Your client id', clientId)
      this.scene.start('MenuScene', { socket, clientId })
    })
  }
}
