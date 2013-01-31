function Actor(forge){
  this.forge  = forge;
}

Actor.prototype.ask = function(toName,message,callback){
  return this;
}

Actor.prototype.tell = function(toName,message){
  this.events.emit('tell',toName,message);
  return this;
}

Actor.prototype.onMessage = function(message){}

function ActorForge(app){
  
}

ActorForge.prototype.New = function(){
  return new Actor(this);
}

ActorForge.prototype.NewWithPathAndEmitter = function(path,emitter){
  var actor = this.New();
  actor.events = emitter;
  return actor;
}

module.exports.forge = function(app){
  return new ActorForge(app);
}
