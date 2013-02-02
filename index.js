var url       = require('url');
var events    = require('events');

// Import Default Transport Modules
var axon      = require('./transports/axon');
var http      = require('./transports/http');

// Application Defaults
var defaults  = require('./defaults');

// Configure Application Dependencies
var lib       = require('./lib');
var app = {}

app.Node      = lib.node      .forge(app);
app.Transport = lib.transport .forge(app);
app.Vertex    = lib.vertex    .forge(app);
app.Gateway   = lib.gateway   .forge(app);
app.Hub       = lib.hub       .forge(app);
app.Actor     = lib.actor     .forge(app);
app.Director  = lib.director  .forge(app);
app.Router    = lib.router    .forge(app);
app.Producer  = lib.producer  .forge(app);
app.Routes    = lib.routes    .forge(app);

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
  
  // HTTP Transport
  // var net_http = gateway.createTransport('http:');
  // http.setupHttpTransport(net_http,options['http']);
  
  // Configure Routes Table
  var table      = options['table'];
  var table_file = options['table_file'];
  if(!table){
    if(!table_file) throw new Error('No Routing Table Defined');
    table = app.Routes.Load(table_file);
  }
  
  // Configure Router
  var router   = app.Router.NewWithTable(table);
  var local    = vertex.createNode('local');
  var producer = app.Producer.NewWithRouterAndNode(router,local);
  
  // Producer Contains all Relevant Sub-Systems
  return producer;

}

module.exports.defaults = defaults;
module.exports.init     = function(options){
  var opts = options || defaults;
  return init(opts);
}
