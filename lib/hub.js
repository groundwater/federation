var assert = require('assert');

function Hub(forge){
  this.forge = forge;
}

Hub.prototype.node = function(name){
  var node = this.forge.Node.New();
  this.switchr.addNode(name,node);
  return node;
}

function HubForge(app){
  assert( this.Node = app.Node, 'Missing Dependency Node' );
}

HubForge.prototype.New = function(){
  return new Hub(this);
}

HubForge.prototype.NewCase = function(gateway,switchr){
  var hub = this.New();
  
  hub.gateway = gateway;
  hub.switchr = switchr;
  
  return hub;
}

module.exports.forge = function(app){
  return new HubForge(app);
}
