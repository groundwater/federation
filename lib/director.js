var events = require('events');
var assert = require('assert');

// Internal Constants
var EXTRA_TIMEOUT = 5000;

// Class
function Director(forge){
  this.forge  = forge;
  this.actors = {};
  this.extras = 0;
  this.max_forwards = 0;
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

Director.prototype.enqueue = function(fromPath,toPath,message,count){
  var actor = this.actors[toPath];
  if(actor){
    var reply = function(message){
      actor.tell(fromPath,message);
    }
    actor.onMessage(message,reply);
  }else{
    if( count < this.max_forwards ){
      // Forward the Message Base on Routing Table
      this.events.emit('enqueue',toPath,fromPath,message,count+1);
    }else{
      // Drop Message
      this.events.emit('dropped',toPath,fromPath,message);
    }
  }
}

// Forge
function DirectorForge(app){
  assert( this.Actor = app.Actor, 'Missing Dependency Actor' );
}

DirectorForge.prototype.New = function(){
  return new Director(this);
}

DirectorForge.prototype.NewWithEmitter = function(emitter){
  var director    = this.New();
  director.events = emitter;
  return director;
}

// Export
module.exports.forge = function(app){
  return new DirectorForge(app);
}
