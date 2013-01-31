var assert = require('assert');

function Director(forge){
  this.forge  = forge;
  this.actors = {};
}

Director.prototype.createActor = function(name){
  
}

function DirectorForge(app){
  assert( this.Actor = app.Actor, 'Missing Dependency Actor' );
}

DirectorForge.prototype.New = function(){
  return new Director(this);
}

module.exports.forge = function(app){
  return new DirectorForge(app);
}
