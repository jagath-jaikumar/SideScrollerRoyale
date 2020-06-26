
var madePlayer = false

exports.addPlayer = function (playerObj, self) {
  const styles = {
    color: '#000000',
    align: 'center',
    fontSize: 18
  };

  if (madePlayer == false) {
    console.log(playerObj.color);
    self.player = self.physics.add.sprite(playerObj.x,playerObj.y,'player',0).setTint(playerObj.color);;
    self.player.setCollideWorldBounds(true);
    self.player.setBounce(0.2);
    self.pname = self.add
      .text(playerObj.x, playerObj.y-80, playerObj.playerName, styles)
      .setOrigin(.5, 0)

    self.physics.add.collider(self.player, self.worldLayer);
    self.cameras.main.startFollow(self.player, true);
    madePlayer = true;
  }


}

exports.addOtherPlayer = function (playerObj, self) {
  const styles = {
    color: '#000000',
    align: 'center',
    fontSize: 18
  };

  if (!(playerObj.clientId in self.otherPlayers)){
    var otherPlayer = self.physics.add.sprite(playerObj.x,playerObj.y,'player',0).setTint(playerObj.color);
    otherPlayer.setCollideWorldBounds(true);
    otherPlayer.setBounce(0.2);
    var otherPname = self.add
      .text(playerObj.x, playerObj.y-80, playerObj.playerName, styles)
      .setOrigin(.5, 0)
    self.physics.add.collider(otherPlayer, self.worldLayer);

    self.otherPlayers[playerObj.clientId] = otherPlayer;
    self.otherPnames[playerObj.clientId] = otherPname;
  }
}


exports.updatePlayer = function(playerObj, self) {

  self.otherPlayers[playerObj.clientId].x = playerObj.x;
  self.otherPlayers[playerObj.clientId].y = playerObj.y;
  self.otherPlayers[playerObj.clientId].angle = playerObj.angle;

  self.otherPnames[playerObj.clientId].x = playerObj.x;
  self.otherPnames[playerObj.clientId].y = playerObj.y-80;

}
