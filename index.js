var url       = require('url');
var events    = require('events');

// Low-Level Imports
var node      = require('./lib/node');
var vertex    = require('./lib/vertex');
var gateway   = require('./lib/gateway');
var transport = require('./lib/transport');
var hub       = require('./lib/hub');

// Higher-Level Imports
var actor     = require('./lib/actor');
var director  = require('./lib/director');
var router    = require('./lib/router');
var producer  = require('./lib/producer');

var routes    = require('./lib/routes');

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
  axon.setupAxonTransport(net_axon,options['axon']);
  
  // Configure Router
  var router   = app.Router.NewWithTable(options['table']);
  var local    = vertex.createNode('local');
  var producer = app.Producer.NewWithRouterAndNode(router,local);
  
  // Producer Contains all Relevant Sub-Systems
  return producer;

}

// Load Routing Table from Package `routes.json` File
var routes_file  = process.env.FED_ROUTES_FILE || __dirname + '/routes.json';
var routes_table = routes.load( routes_file );
var defaults = {
  axon      : {
    PORT: 8973
  },
  table     : routes_table
}

module.exports.defaults = defaults;
module.exports.init     = function(options){
  var opts = options || defaults;
  return init(opts);
}
