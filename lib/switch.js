var assert = require('assert');
var events = require('events');

// Class

function Switch(forge){
  this.forge  = forge;
  this.nodes  = {};
}

Switch.prototype.send = function(address,message){
  var path = address.path;
  var node = this.nodes[path];
  if(node){
    node.receive(address,message);
  }else{
    throw new Error('Cannot Receive : Node Not Found');
  }
}

Switch.prototype.addNode = function(name,node){
  this.nodes[name] = node;
}

// Forge

function SwitchForge(app){
  
}

SwitchForge.prototype.New = function(){
  return new Switch(this);
}

// Injection

module.exports.forge = function(app){
  return new SwitchForge(app);
}
