var events = require('events');

// --------------------------------
// ## Transport
// 
function Transport(){}

// ----
// ### Receive
// 
// Receive an incoming packet from a wire protocol.
// 
Transport.prototype.receive = function(packet){
  this.emitter.emit('message',packet);
}

// ----
// ### Enqueue
// 
// Enqueue a message for outgoing packets.
// The enqueue function must be overriden to be functional.
// 
Transport.prototype.enqueue = function(){
  console.warn('Enqueue Called on Empty Handler');
}

// --------------------------------
// ## Forge
// 
function TransportForge(){}

// ----
// ### New
// 
// Create an empty transport.
// 
TransportForge.prototype.New = function(){
  return new Transport(this);
}

// ----
// ### NewWithEmitter
// 
// Create a transport with associated emitter.
// The attached emitter will be called with signature
// `emitter.emit('message',packet)`.
// 
TransportForge.prototype.NewWithEmitter = function(emitter){
  var transport = this.New();
  transport.emitter = emitter;
  return transport;
}

// --------------------------------
// ## Dependency Injector
// 
module.exports.forge = function(app){
  return new TransportForge(app);
}
