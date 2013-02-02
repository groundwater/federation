var assert = require('assert');

function Gateway(forge){
  this.forge      = forge;
  this.transports = {}
}

Gateway.prototype.enqueue = function(message){
  var proto = message.head.dst.protocol;
  var trans = this.transports[proto];
  
  if(trans){
    process.nextTick(function(){
      trans.enqueue(message);
    });
  }else{
    this.emitter.emit('dropped',message);
  }
  
  return this;
}

Gateway.prototype.createTransport = function(name){
  var transport = this.forge.Transport.NewWithEmitter(this.emitter);
  this.transports[name] = transport;
  return transport;
}

function GatewayForge(app){
  assert(this.Transport = app.Transport, 'Missing Dependency Transport');
}

GatewayForge.prototype.New = function(){
  return new Gateway(this);
}
GatewayForge.prototype.NewWithEmitter = function(emitter){
  var gateway     = this.New();
  gateway.emitter = emitter;
  return gateway;
}

module.exports.forge = function(app){
  return new GatewayForge(app);
}
