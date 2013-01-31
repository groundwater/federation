var url       = require('url');
var events    = require('events');

var node      = require('./lib/node');
var vertex    = require('./lib/vertex');
var gateway   = require('./lib/gateway');
var transport = require('./lib/transport');
var hub       = require('./lib/hub');

var actor     = require('./lib/actor');
var director  = require('./lib/director');
var router    = require('./lib/router');
var producer  = require('./lib/producer');

// Import Default Transport Modules
var axon      = require('./transports/axon');

// Configure Application Dependencies
var app = {}

app.Node      = node      .forge(app);
app.Transport = transport .forge(app);
app.Vertex    = vertex    .forge(app);
app.Gateway   = gateway   .forge(app);
app.Hub       = hub       .forge(app);

app.Actor     = actor     .forge(app);
app.Director  = director  .forge(app);
app.Router    = router    .forge(app);
app.Producer  = producer  .forge(app);

function init(options){
  
  var outbox  = new events.EventEmitter();
  var inbox   = new events.EventEmitter();
  
  var hub     = app.Hub.NewWithEmitters(inbox,outbox);
  
  var gateway = hub.createGateway();
  var vertex  = hub.createVertex();
  
  // Create a Loopback Interface for Protocol-less Addresses
  var loopback = gateway.createTransport();
  loopback.enqueue = loopback.receive;
  
  // Configure Axon push/pull Transport
  var net_axon = gateway.createTransport('axon:');
  axon.setupAxonTransport(net_axon,options);
  
  var table  = [
    {
      regex: /.*/,
      address: '/local'
    }
  ]
  
  var router   = app.Router.NewWithTable(table);
  var local    = vertex.createNode('local');
  var producer = app.Producer.NewWithRouterAndNode(router,local);
  
  return producer.director;

}

var defaults = {
  AXON_PORT: 8973
}

module.exports.init = function(options){
  var opts = options || defaults;
  return init(opts);
}
