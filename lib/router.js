var assert = require('assert');

function Router(forge){
  this.forge = forge;
  this.nodes = {};
}

Router.prototype.enqueue    = function(message){
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
Router.prototype.createNode = function(name){
  var node = this.forge.Node.NewWithNameAndEmitter(name,this.emitter);
  var path = '/' + name;
  this.nodes[path] = node;
  return node;
}
Router.prototype.deleteNode = function(name){
  // TODO
}

Router.prototype.emitter    = null;

function RouterForge(app){
  assert( this.Node = app.Node, 'Missing Dependency Node');
}

RouterForge.prototype.New = function(){
  return new Router(this);
}
RouterForge.prototype.NewWithEmitter = function(emitter){
  var router = this.New();
  
  router.emitter = emitter;
  
  return router;
}

module.exports.forge = function(app){
  return new RouterForge(app);
}
