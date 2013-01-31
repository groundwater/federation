function Actor(forge){
  this.forge  = forge;
}

Actor.prototype.ask = function(toName,message,callback){
  return this;
}

Actor.prototype.tell = function(toName,message){
  return this;
}

Actor.prototype.onMessage = function(){}

function ActorForge(app){
  
}

ActorForge.prototype.New = function(){
  return new Actor(this);
}

module.exports.forge = function(app){
  return new ActorForge(app);
}
