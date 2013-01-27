var axon       = require('axon');

var Node       = require('./lib/node');
var Hub        = require('./lib/hub');
var Socket     = require('./lib/socket');

// Dependency Container
var app        = {};

// Internal Dependencies
app.Socket     = Socket    .inject(app);
app.Node       = Node      .inject(app);
app.Hub        = Hub       .inject(app);

// Bind Defaults
var PORT       = process.env.PORT || 8973;
var ADDR       = process.env.HOST || '0.0.0.0';

// Bootup!
module.exports.join = function(url){
    
  console.log('Federation Joined to %s',url);
  
  // External Dependencies
  var send       = axon.socket('pub-emitter');
  var recv       = axon.socket('sub-emitter');
  
  // Connect AXON Ports
  // 
  // **Note**
  //
  // This should be the _only_ coupling with axon that should exist. 
  // We do **not** require the axon module anywhere else
  send.connect(url);
  recv.bind(PORT,ADDR);
  
  // Initialize Socket Interface
  var socket = app.Socket.NewFromSendRecv(send,recv);
  
  // Initialize Hub Interface
  var hub    = app.Hub.NewFromSocket(socket);
  
  return hub;

}
