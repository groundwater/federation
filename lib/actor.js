// --------------------------------
// # Actor
// 
// Actors are the principal type used by Federation.
// Actors send and receive messages to other actors,
// anywhere, regardless of host.
// 
function Actor(forge){
  this.forge  = forge;
}

// ----
// ## Ask
// 
// Send another actor on the network a message,
// expecting a reply.
// 
Actor.prototype.ask = function(toName,message,callback){
  this.events.emit('ask',toName,message,callback);
}

// ----
// ## Tell
// 
// Send a one-off message to another actor on the network.
// 
Actor.prototype.tell = function(toName,message){
  this.events.emit('tell',toName,message);
}

// ----
// ## Message Handler
// 
// Setup a message handler for the actor.
// The default handler just drops incoming messages silently.
// 
Actor.prototype.onMessage = function(message){}

// ------------------------------
// ## Forge
// 
function ActorForge(app){
  
}

ActorForge.prototype.New = function(){
  return new Actor(this);
}

ActorForge.prototype.NewWithEmitter = function(emitter){
  var actor = this.New();
  actor.events = emitter;
  return actor;
}

// ------------------------------
// ## Dependency Injector
// 
module.exports.forge = function(app){
  return new ActorForge(app);
}
