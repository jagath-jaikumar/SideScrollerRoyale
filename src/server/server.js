var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var compression = require('compression');
var helmet = require('helmet');
const path = require('path');
var router = require('./routes/router');
var SocketGame = require('./socket/socketGame');
var RoomManager = require('./managers/roomManager');

const ioNsp = io.of('/G');

const roomManager = new RoomManager(ioNsp);
const ioGame = new SocketGame(ioNsp, roomManager)


/* Public folder */
app.use(express.static(path.join(__dirname, '../client')));


app.use(helmet());
app.use(compression());


app.get('/', router.home)


app.use(router.e404);
app.use(router.e500);

/* Run */
server.listen(process.env.PORT || 5000, function() {
  console.log(`Listening on ${server.address().port}`);
});
