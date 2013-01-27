var axon    = require('axon');

var address = require('./lib/address');
var packet  = require('./lib/packet');
var router  = require('./lib/router');

var app     = {};

app.Address = address .forge(app);
app.Packet  = packet  .forge(app);
app.Router  = router  .forge(app);

var PORT    = process.env.PORT || 8973;
var socket  = axon.socket('sub-emitter');

socket.bind(PORT);

var router = app.Router.NewFromSocket(socket);

console.log('Router Start on Port',PORT);
