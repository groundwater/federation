function Actor(forge){
  this.forge  = forge;
}

Actor.prototype.ask = function(toName,message,callback){
  this.events.emit('ask',toName,message,callback);
}

Actor.prototype.tell = function(toName,message){
  this.events.emit('tell',toName,message);
}

Actor.prototype.onMessage = function(message){}

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

module.exports.forge = function(app){
  return new ActorForge(app);
}
