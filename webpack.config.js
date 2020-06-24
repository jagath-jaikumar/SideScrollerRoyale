const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/client/game.js',
  output: {
    path: path.resolve(__dirname, './src/client/dist'),
    filename: 'game.bundle.js'
  }
};
