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
app.Route     = lib.route     .forge(app);
app.Table     = lib.table     .forge(app);

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
  if(options.axon){
    var net_axon = gateway.createTransport('axon:');
    axon.setupAxonTransport(net_axon,options['axon']);
  }
  
  // HTTP Transport
  if(options.http){
    var net_http = gateway.createTransport('http:');
    http.setupHttpTransport(net_http,options['http']);
  }
  
  // Configure Routes Table
  var route_json = {
    regex: /.*/,
    address: '/'
  }
  var table      = app.Table.New();
  var route      = app.Route.NewFromJSON(route_json);
  table.addRoute(1000000,route);
  
  // Configure Router
  var r_emit   = new events.EventEmitter();
  var router   = app.Router.NewWithTableAndEmitter(table,r_emit);
  var node     = vertex.createNode();
  var producer = app.Producer.NewWithRouter(router);
  
  r_emit.on('send',function(address,packet){
    node.send(address,packet);
  });
  
  node.receive = function(packet){
    producer.enqueue(packet);
  }
  
  // Producer Contains all Relevant Sub-Systems
  return producer;

}

module.exports.defaults = defaults;
module.exports.init     = function(options){
  var opts = options || defaults;
  return init(opts);
}
