var constants = require('../../constants')

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


  preload() {}

  create() {
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, constants.WORLD_HEIGHT, 'ground').setScale(8).refreshBody();


    this.player = this.physics.add.sprite(400,1700,'player');
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors = this.input.keyboard.addKeys(
    {
      up:Phaser.Input.Keyboard.KeyCodes.W,
      down:Phaser.Input.Keyboard.KeyCodes.S,
      left:Phaser.Input.Keyboard.KeyCodes.A,
      right:Phaser.Input.Keyboard.KeyCodes.D
    });


    this.physics.add.collider(this.player, this.platforms);

    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setBounds(0, 0, constants.WORLD_WIDTH, constants.WORLD_HEIGHT);
    this.physics.world.setBounds(0, 0, constants.WORLD_WIDTH, constants.WORLD_HEIGHT);


    this.input.on('pointermove', function (pointer) {
      let cursor = pointer;
      let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
      this.player.setRotation(angle + Math.PI/2);
    }, this);

  }

  update() {

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-500);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(500);
    }
    else
    {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown  && this.player.body.touching.down)
     {
         this.player.setVelocityY(-500);
     }

  }


}
