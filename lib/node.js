var assert = require('assert');
var events = require('events');
var url    = require('url');

function Node(forge){
  this.forge    = forge;
}

Node.prototype.receive = function(){
  console.warn('Message Received on Empty Handler');
}

Node.prototype.ask     = function(address,question){
  // TODO
}

Node.prototype.tell    = function(address,message){
  var packet = {
    head:{
      src: url.parse(this.name),
      dst: url.parse(address)
    },
    body: message
  }
  this.emitter.emit('message',packet);
  
  return this;
}

Node.prototype.enqueue = function(packet){
  var body = packet.body;
  var head = packet.head;
  this.receive(body,head);
}

Node.prototype.emitter = new events.EventEmitter();
Node.prototype.name    = '';

function NodeForge(app){}

NodeForge.prototype.New = function(){
  return new Node(this);
}
NodeForge.prototype.NewWithNameAndEmitter = function(name,emitter){
  var node = this.New();
  
  node.emitter = emitter;
  node.name    = name;
  
  return node;
}

module.exports.forge = function(app){
  return new NodeForge(app);
}
