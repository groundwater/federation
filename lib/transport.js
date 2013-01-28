var events = require('events');

function Transport(){}

// Receive an Incoming Packet
Transport.prototype.receive = function(packet){
  this.emitter.emit('message',packet);
}

// Enqueue an Outgoing Packet
Transport.prototype.enqueue = function(){
  console.warn('Enqueue Called on Empty Handler');
}

function TransportForge(){}

TransportForge.prototype.New = function(){
  return new Transport(this);
}
TransportForge.prototype.NewWithEmitter = function(emitter){
  var transport = this.New();
  transport.emitter = emitter;
  return transport;
}

module.exports.forge = function(app){
  return new TransportForge(app);
}