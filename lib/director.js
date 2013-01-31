var events = require('events');
var assert = require('assert');

var EXTRA_TIMEOUT = 5000;

function Director(forge){
  this.forge  = forge;
  this.actors = {};
  this.extras = 0;
}

Director.prototype.deleteActor = function(path){
  delete this.actors[path];
}

Director.prototype.lookupActor = function(path){
  return this.actors[path];
}

Director.prototype.createExtra = function(timeout){
  var self = this;
  var path = 'extra-' + this.extras++;
  
  timeout = timeout || EXTRA_TIMEOUT;
  
  setTimeout(function(){
    self.deleteActor(path);
  },timeout);
  
  return this.createActor(path);
}

Director.prototype.createActor = function(path){
  var emitter = new events.EventEmitter();
  var actor   = this.forge.Actor.NewWithEmitter(emitter);
  var self    = this;
  
  emitter.on('ask',function(toPath,message,callback){
    var extra = self.createExtra()
    extra.onMessage = callback;
    extra.tell(toPath,message);
  });
  
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
    var reply = function(message){
      actor.tell(fromPath,message)
    }
    if(actor){
      actor.onMessage(message,reply);
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
