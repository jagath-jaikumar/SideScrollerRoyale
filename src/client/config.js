var PreloadScene  = require('./scenes/preloadScene')

const DEFAULT_WIDTH = 1750;
const DEFAULT_HEIGHT = 850;

// the size of the world
exports.world = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1920
}

exports.config = {
  type: Phaser.WEBGL,
  backgroundColor: '#00ffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene],
  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 1
      },
      debug: false,
      debugBodyColor: 0xff00ff
    }
  }
};
