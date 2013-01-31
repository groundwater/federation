var assert = require('assert');
var events = require('events');
var url    = require('url');

var DEFAULT_TIMEOUT = 5000;

function Node(forge){
  this.forge    = forge;
}

Node.prototype.error    = function(){}
Node.prototype.receive  = function(){}
Node.prototype.send     = function(address,message){
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
  var self = this;
  
  var body = packet.body;
  var head = packet.head;
  
  var src  = head.src;
  
  var meta = function(message){
    self.send(src,message);
  }
  
  meta.replyAddress = src;
  
  this.receive(body,meta);
}

Node.prototype.emitter = new events.EventEmitter();
Node.prototype.name    = '';

function NodeForge(app){}

NodeForge.prototype.New = function(){
  return new Node(this);
}

NodeForge.prototype.NewCase = function(name,emitter,router){
  var node = this.New();
  
  node.emitter = emitter;
  node.name    = name;
  node.router  = router;
  
  return node;
}

module.exports.forge = function(app){
  return new NodeForge(app);
}
