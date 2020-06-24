module.exports = class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }
  init(props) {
    const { socket } = props
    this.socket = socket
  }
  preload() {
    var url;
    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbbcodetextplugin.min.js';
    this.load.plugin('rexbbcodetextplugin', url, true);

    url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextexteditplugin.min.js';
    this.load.plugin('rextexteditplugin', url, true);
  }

  create() {
    const styles = {
      color: '#000000',
      align: 'center',
      fontSize: 52
    };

    let texts = [];

    texts.push(
      this.add
        .text(0, 0, 'SideScrollerRoyale', styles)
        .setOrigin(0.5, 0)
    );
    var printText = this.add.rexBBCodeText(400, 300, 'Enter a nickname', {
            color: 'black',
            fontSize: '30px',
            fixedWidth: 300,
            backgroundColor: '#00EEEE',
        })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', function () {
                this.plugins.get('rextexteditplugin').edit(printText);
            }, this);

    texts.push(printText);

    texts.push(
      this.add
        .text(0, 0, 'Play', styles)
        .setOrigin(0.5, 0)
        .setInteractive()
        .on('pointerdown', () => {
          var input = printText.text;
          if (input !== 'Enter a nickname' && input !== ""){

            this.scene.start('MainScene', { scene: 'MatterScene', playerName: input, socket: this.socket });
          }
        })
    );


    const { centerX, centerY } = this.cameras.main;
    let posY = [20, centerY - 100, centerY - 10, centerY + 60, centerY + 130]
    texts.forEach((text, i) => {
      text.setPosition(centerX, posY[i]);
    });


  }
}
