var assert = require('assert');
var events = require('events');
var url    = require('url');

function Node(forge){
  this.forge    = forge;
}

Node.prototype.callback = function(){}
Node.prototype.receive = function(callback){
  this.callback = callback;
  return this;
}

Node.prototype.ask     = function(address,question){
  var anon = this.router.createNode();
  anon.tell(address,question);
  return anon;
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
  var self = this;
  
  var body = packet.body;
  var head = packet.head;
  
  var src  = head.src;
  
  var meta = function(message){
    self.tell(src,message);
  }
  
  meta.replyAddress = src;
  
  this.callback(body,meta);
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

NodeForge.prototype.NewWithNameAndEmitter = function(name,emitter){
  var node = this.New();
  
  node.emitter = emitter;
  node.name    = name;
  
  return node;
}

module.exports.forge = function(app){
  return new NodeForge(app);
}
