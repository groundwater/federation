var assert = require('assert');

// -------------------------------
// ## Vertex
// 
// The vertex passes messages to nodes.
// 
function Vertex(forge){
  this.forge = forge;
  this.nodes = {};
  this.index = 0;
}

// ----
// ### Enqueue
// 
// Enqueue a message for delivery to a local node.
// 
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

// ----
// ### Create a Node
// 
// Create a new node at the given name.
// 
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

// ----
// ### Emitter Property
// 
// Vertex has a public emitter property.
// 
Vertex.prototype.emitter    = null;

// -------------------------------
// ## Forge
// 
function VertexForge(app){
  assert( this.Node = app.Node, 'Missing Dependency Node');
}

// ----
// ### New Vertex
// 
// Create a new empty `Vertex`.
// 
VertexForge.prototype.New = function(){
  return new Vertex(this);
}

// ----
// ### New with Emitter
// 
// Attach an event emitter to a new `Vertex`.
// The emitter is a public property of the vertex.
// 
VertexForge.prototype.NewWithEmitter = function(emitter){
  var vertex = this.New();
  
  vertex.emitter = emitter;
  
  return vertex;
}

// -------------------------------
// ## Dependency Injector
// 
module.exports.forge = function(app){
  return new VertexForge(app);
}
