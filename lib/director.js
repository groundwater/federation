var events = require('events');
var assert = require('assert');

function Director(forge){
  this.forge  = forge;
  this.actors = {};
}
Director.prototype.lookupActor = function(path){
  return this.actors[path];
}
Director.prototype.createActor = function(path){
  var emitter = new events.EventEmitter();
  var actor   = this.forge.Actor.NewWithPathAndEmitter(path,emitter);
  var self    = this;
  
  emitter.on('tell',function(toPath,message){
    self.events.emit('enqueue',toPath,path,message);
  });
  
  this.actors[path] = actor;
  
  return actor;
}

function DirectorForge(app){
  assert( this.Actor = app.Actor, 'Missing Dependency Actor' );
}

DirectorForge.prototype.New = function(){
  return new Director(this);
}

DirectorForge.prototype.NewWithEmitter = function(emitter){
  var director    = this.New();
  director.events = emitter;
  director.events.on('dequeue',function(fromPath,toPath,message){
    var actor = director.actors[toPath];
    if(actor){
      actor.onMessage(message);
    }else{
      // TODO
      console.log('Director Cannot Find Actor %s', toPath);
    }
  });
  return director;
}

module.exports.forge = function(app){
  return new DirectorForge(app);
}
