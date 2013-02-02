var events = require('events');
var assert = require('assert');

// Internal Constants
var EXTRA_TIMEOUT = 5000;

// Class
function Director(forge){
  this.forge        = forge;
  this.actors       = {};
  this.extras       = 0;
  this.max_forwards = 0;
}

Director.prototype.deleteActor = function(path){
  delete this.actors[path];
}

Director.prototype.createExtra = function(basepath){
  var path = basepath + '/extra-' + this.extras++;
  return this.createActor(path);
}

Director.prototype.createActor = function(path){
  var emitter = new events.EventEmitter();
  var actor   = this.forge.Actor.NewWithEmitter(emitter);
  var self    = this;
  
  emitter.on('ask',function(toPath,message,callback){
    
    var extra = self.createExtra(path);
    
    // Return an Error on Timeout
    var timer = setTimeout(function(){
      callback('TIMEOUT');
      self.deleteActor(extra);
    }, EXTRA_TIMEOUT);
    
    // Return Message on Success
    extra.onMessage = function(message){
      clearTimeout(timer);
      callback(null,message);
      self.deleteActor(extra);
    }
    
    extra.tell(toPath,message);
    
  });
  
  emitter.on('tell',function(toPath,message){
    var packet = {
      toPath   : toPath,
      fromPath : path,
      message  : message
    }
    self.events.emit('enqueue',packet);
  });
  
  this.actors[path] = actor;
  
  return actor;
}

// Post a Message for Local Delivery or Forwarding
Director.prototype.enqueue = function(packet){
  var fromPath = packet.fromPath;
  var toPath   = packet.toPath;
  var message  = packet.message;
  var count    = packet.count || 0;
  var actor    = this.actors[toPath];
  if(actor){
    // Handle Message with Local Actor
    var reply = function(message){
      actor.tell(fromPath,message);
    }
    
    // Process Message in Clean Stack
    process.nextTick(function(){
      actor.onMessage(message,reply);
    });
    
  }else{
    // The Path Failed to Match a Local Actor
    if( packet.count++ < this.max_forwards ){
      // Forward the Message Base on Routing Table
      this.events.emit('enqueue',packet);
    }else{
      // Drop Message
      this.events.emit('dropped',packet);
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
