var assert = require('assert');

function Switcher(forge){
  this.forge = forge;
  this.nodes = {};
}

Switcher.prototype.enqueue    = function(message){
  var path = message.head.dst.path;
  var node = this.nodes[path];
  
  if(node){
    node.enqueue(message);
  }else{
    // TODO
    console.log('No Node',message);
  }
  
  return this;
}
Switcher.prototype.createNode = function(name){
  var node = this.forge.Node.NewWithNameAndEmitter(name,this.emitter);
  var path = '/' + name;
  this.nodes[path] = node;
  return node;
}
Switcher.prototype.deleteNode = function(name){
  // TODO
}

Switcher.prototype.emitter    = null;

function SwitcherForge(app){
  assert( this.Node = app.Node, 'Missing Dependency Node');
}

SwitcherForge.prototype.New = function(){
  return new Switcher(this);
}
SwitcherForge.prototype.NewWithEmitter = function(emitter){
  var switcher = this.New();
  
  switcher.emitter = emitter;
  
  return switcher;
}

module.exports.forge = function(app){
  return new SwitcherForge(app);
}
