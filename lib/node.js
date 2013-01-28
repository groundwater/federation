var events = require('events');
var assert = require('assert');
var url    = require('url');

function Node(forge){
  this.forge    = forge;
  this.events   = new events.EventEmitter();
  this.handlers = {};
}

Node.prototype.name = '';
Node.prototype.emit = function(address,message){
  var payload = this.forge.Payload.NewCase(this.name,address,message);
  this.events.emit('send',payload);
}

Node.prototype.on = function(handler,callback){
  var self = this;
  self.events.on('receive',function(payload){
    var dst    = payload.dst;
    var hash   = dst.hash;
    var handle = self.handlers[hash];
    if(handle){
      handle(payload.msg);
    }else{
      // unknown
    }
  });
}

function NodeForge(app){
  assert(this.Payload = app.Payload, 'Missing Dependency Payload');
}

NodeForge.prototype.New = function(){
  return new Node(this);
}

NodeForge.prototype.NewWithEmitter = function(name,emitter){
  var node = this.New();
  node.events = emitter;
  node.name   = name;
  return node;
}

module.exports.forge = function(app){
  return new NodeForge(app);
}
