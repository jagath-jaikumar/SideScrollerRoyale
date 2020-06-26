var constants = require('../../constants')
var playerHandler = require('../components/playerHandler');

module.exports = class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  init(props) {
    const { scene, playerName, socket , clientId} = props;
    this.playerName = playerName;
    this.socket = socket;
    this.clientId = clientId;
    this.socket.emit('joinRoom', { scene, playerName })
  }


  preload() {}

  create() {
    // this.platforms = this.physics.add.staticGroup();
    //
    // this.platforms.create(400, constants.WORLD_HEIGHT, 'ground').setScale(8).refreshBody();


    const map = this.make.tilemap({ key: "map" });

    console.log(map);

// Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
// Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tmap1", "groundtiles");

    this.worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);
    this.worldLayer.setCollisionByProperty({ collides: true });


    this.otherPlayers = {};
    this.otherPnames = {};

    var self = this;


    this.socket.on('CurrentPlayers', function(players) {
      for (const player in players){
        var playerData = players[player];
        if (playerData.clientId === this.clientId) {
          playerHandler.addPlayer(playerData,self);
        } else {
          playerHandler.addOtherPlayer(playerData, self);
        }
      }
    });
    this.socket.on('NewPlayer', function(player) {
      playerHandler.addOtherPlayer(player, self);
    })

    this.socket.on('DestroyPlayer', function(clientId) {
      self.otherPnames[clientId].destroy();
      self.otherPlayers[clientId].destroy();
    })

    this.socket.on('UpdateClient', function(gameData) {
      for (const playerId in gameData.players) {
        var playerObj = gameData.players[playerId];
        if (playerObj.clientId !== this.clientId){
          playerHandler.updatePlayer(playerObj,self);
        }
      }
    });

    this.input.on('pointermove', function (pointer) {
      let cursor = pointer;
      let angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY)
      this.player.setRotation(angle + Math.PI/2);
    }, this);


    this.cameras.main.setBounds(0, 0, constants.WORLD_WIDTH, constants.WORLD_HEIGHT);
    this.physics.world.setBounds(0, 0, constants.WORLD_WIDTH, constants.WORLD_HEIGHT);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors = this.input.keyboard.addKeys(
    {
      w:Phaser.Input.Keyboard.KeyCodes.W,
      up:Phaser.Input.Keyboard.KeyCodes.UP,
      s:Phaser.Input.Keyboard.KeyCodes.S,
      down:Phaser.Input.Keyboard.KeyCodes.DOWN,
      a:Phaser.Input.Keyboard.KeyCodes.A,
      left:Phaser.Input.Keyboard.KeyCodes.LEFT,
      d:Phaser.Input.Keyboard.KeyCodes.D,
      right:Phaser.Input.Keyboard.KeyCodes.RIGHT
    });

  }

  update() {

    if (this.player) {
      if (this.cursors.left.isDown || this.cursors.a.isDown)
      {
          this.player.setVelocityX(-500);
      }
      else if (this.cursors.right.isDown || this.cursors.d.isDown)
      {
          this.player.setVelocityX(500);
      } else
      {
          this.player.setVelocityX(0);
      }
      if ((this.cursors.up.isDown || this.cursors.w.isDown)  && (this.player.body.blocked.down || this.player.body.blocked.left || this.player.body.blocked.right))
       {
           this.player.setVelocityY(-500);
       }

       this.pname.setPosition(this.player.x, this.player.y-80);



       var myPlayerData = {
         clientId: this.clientId,
         x: this.player.x,
         y: this.player.y,
         angle: this.player.angle
       }
       this.socket.emit('UpdateServer', myPlayerData);
    }

  }
}
