var assert = require('assert');

function Vertex(forge){
  this.forge = forge;
  this.nodes = {};
  this.index = 0;
}

Vertex.prototype.enqueue    = function(message){
  var path = message.head.dst.path;
  var node = this.nodes[path];
  
  if(node){
    process.nextTick( function(){
      node.enqueue(message);
    });
  }else{
    // TODO
    console.log('No Node',message);
  }
  
  return this;
}
Vertex.prototype.createNode = function(name){
  
  if(!name) name = '';
  
  var path = '/' + name;
  var node = this.forge.Node.NewCase(path,this.emitter);
  this.nodes[path] = node;
  
  return node;
}
Vertex.prototype.deleteNode = function(name){
  // TODO
}

Vertex.prototype.emitter    = null;

function VertexForge(app){
  assert( this.Node = app.Node, 'Missing Dependency Node');
}

VertexForge.prototype.New = function(){
  return new Vertex(this);
}
VertexForge.prototype.NewWithEmitter = function(emitter){
  var vertex = this.New();
  
  vertex.emitter = emitter;
  
  return vertex;
}

module.exports.forge = function(app){
  return new VertexForge(app);
}
