module.exports = class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  init(props) {
    const { scene, playerName, socket } = props;
    this.playerName = playerName;
    this.socket = socket;
    this.socket.emit('newPlayer', { scene, playerName });
  }

  preload() {
    console.log(this.playerName);
  }

  create() {
    const socket = this.socket;
  }
}
