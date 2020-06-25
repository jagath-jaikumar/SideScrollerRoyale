var PreloadScene  = require('./scenes/preloadScene');
var MenuScene  = require('./scenes/menuScene');
var MainScene  = require('./scenes/mainScene');

var constants = require('../constants');

exports.config = {
  type: Phaser.WEBGL,
  backgroundColor: '#00ffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: constants.DEFAULT_WIDTH,
    height: constants.DEFAULT_HEIGHT
  },
  dom: {
      createContainer: true
  },
  scene: [PreloadScene, MenuScene, MainScene],
  physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: constants.GRAVITY },
            debug: true
        }
    },
  pixelArt:false,
  // physics: {
  //   default: 'matter',
  //   matter: {
  //     gravity: {
  //       y: 1
  //     },
  //     debug: false,
  //     debugBodyColor: 0xff00ff
  //   }
  // },
};
