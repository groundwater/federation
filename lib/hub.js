var assert = require('assert');
var events = require('events');

function Hub(forge){
  this.forge = forge;
}

Hub.prototype.createGateway = function(){
  var gw = this.forge.Gateway.NewWithEmitter(this.transport_emitter);
  this.gateway = gw;
  return gw;
}

Hub.prototype.createSwitcher = function(){
  var sw = this.forge.Switcher.NewWithEmitter(this.node_emitter);
  this.switcher = sw;
  return sw;
}

function HubForge(app){
  assert( this.Switcher = app.Switcher, 'Missing Dependency Switcher' );
  assert( this.Gateway  = app.Gateway,  'Missing Dependency Gateway' );
}

HubForge.prototype.New = function(){
  var hub = new Hub(this);
  return hub;
}

HubForge.prototype.NewWithEmitters = function(transports,nodes){
  var hub = this.New();
  
  hub.transport_emitter  = transports;
  hub.node_emitter       = nodes;
  
  transports.on('message',function(packet){
    hub.switcher.enqueue(packet);
  });
  
  nodes.on('message',function(packet){
    hub.gateway.enqueue(packet);
  });
  
  return hub;
}

module.exports.forge = function(app){
  return new HubForge(app);
}
