var assert = require('assert');

// --------------------------------
// ## Gateway
// 
function Gateway(forge){
  this.forge      = forge;
  this.transports = {}
}

// ----
// ### Enqueue
// 
// Enqueue an outgoing packet.
// Packets will be matched against available transport protocols.
// 
Gateway.prototype.enqueue = function(message){
  var proto = message.head.dst.protocol;
  var trans = this.transports[proto];
  
  if(trans){
    
    // Transport Matched Protocol
    process.nextTick(function(){
      trans.enqueue(message);
    });
    
  }else{
    
    // No Matching Protocol
    this.emitter.emit('dropped',message);
    
  }
  
}

// ----
// ### Create Transport
// 
// Create a transport that responds to the given protocol.
// The protocol _must_ include a trailing colon (`:`).
// 
Gateway.prototype.createTransport = function(name){
  
  // Pass emitter to new transports
  var transport = this.forge.Transport.NewWithEmitter(this.emitter);
  this.transports[name] = transport;
  return transport;
  
}

// --------------------------------
// ## Forge
// 
function GatewayForge(app){
  assert(this.Transport = app.Transport, 'Missing Dependency Transport');
}

// ----
// ### New
// 
// Create a new empty Gateway.
// 
GatewayForge.prototype.New = function(){
  return new Gateway(this);
}

// ----
// ### Create Transport
// 
// The attached emitter will be called whenever messages
// are dropped. Messages are dropped when there are no 
// available protocols.
// 
GatewayForge.prototype.NewWithEmitter = function(emitter){
  var gateway     = this.New();
  gateway.emitter = emitter;
  return gateway;
}

// --------------------------------
// ## Injector
// 
module.exports.forge = function(app){
  return new GatewayForge(app);
}
