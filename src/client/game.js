var config = require('./config')
module.exports = class Game extends Phaser.Game {
  constructor() {
    super(config.config)
  }
}
