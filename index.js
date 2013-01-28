var url       = require('url');
var events    = require('events');

var node      = require('./lib/node');
var router    = require('./lib/router');
var gateway   = require('./lib/gateway');
var transport = require('./lib/transport');
var hub       = require('./lib/hub');

var app = {}

app.Node      = node      .forge(app);
app.Transport = transport .forge(app);
app.Router    = router    .forge(app);
app.Gateway   = gateway   .forge(app);
app.Hub       = hub       .forge(app);

function init(){
  
  var outbox  = new events.EventEmitter();
  var inbox   = new events.EventEmitter();
  
  var hub     = app.Hub.NewWithEmitters(inbox,outbox);
  
  var gateway = hub.createGateway();
  var router  = hub.createRouter();
  
  // Create a Loopback Interface for Protocol-less Addresses
  var loopback = gateway.createTransport();
      loopback.enqueue = loopback.receive;
  
  return hub;
}

module.exports = init();
