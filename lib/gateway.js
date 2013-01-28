var events = require('events');
var assert = require('assert');

// # Gateway Class
// Generally there should only be one switch per process.

function Gateway(forge){
  this.forge    = forge;
  this.handlers = {};
}

// Send a message _from_ a local node
Gateway.prototype.send = function(address,message){
  var proto  = address.protocol;
  var handle = this.handlers[proto];
  if(handle){
    handle.emit('send',address,message);
  }else{
    throw new Error('Cannot Send : Protocol Not Found');
  }
}

// Add a transport agent
Gateway.prototype.addHandler = function(protocol,handler){
  assert( handler.emit, 'Handler Must Have `emit` Method' );
  this.handlers[protocol] = handler;
}

// # Gateway Forge

function GatewayForge(app){}

GatewayForge.prototype.New = function(){
  return new Gateway(this);
}

// # Dependency Injector

module.exports.forge = function(app){
  return new GatewayForge();
}
