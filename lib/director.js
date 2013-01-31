var events = require('events');

function Director(forge){
  this.forge  = forge;
}

Director.prototype.addPeer = function(name,url){
  
}

Director.prototype.createActor = function(name){
  
}

function DirectorForge(app){
  
}

DirectorForge.prototype.New = function(){
  return new Director(this);
}

module.exports.forge = function(app){
  return new DirectorForge(app);
}
