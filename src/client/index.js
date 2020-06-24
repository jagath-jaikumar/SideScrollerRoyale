var phaser = require('phaser');
var Game = require('./game')

// var resize = require('./components/resize')

window.addEventListener('load', () => {
  let game = new Game();

  window.addEventListener('resize', () => {
    // resize.resize(game);
  })

  // resize.resize(game);
})
