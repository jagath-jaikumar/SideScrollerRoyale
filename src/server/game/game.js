require('@geckos.io/phaser-on-nodejs');
var commonConfig = require('./config').config;
var MainScene = require('./scene');


class PhaserGame extends Phaser.Game {
  constructor(config){
    super(config);
  }
}

exports.Game = (roomManager, roomId) => {
  var config = commonConfig;

  config.scene = [new MainScene()];

  config.callbacks = {
    preBoot: () => {
      return { roomManager, roomId }
    }
  }

  return new PhaserGame(config);
}
