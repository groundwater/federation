var events = require('events');
var assert = require('assert');

// The Producer provides the Modules Client API
function Producer(forge){
  this.forge  = forge;
}

Producer.prototype.enqueue = function(packet){
  this.director.enqueue(packet);
}

function ProducerForge(app){
  assert(this.Director = app.Director, 'Missing Dependency Director');
}

ProducerForge.prototype.New = function(){
  return new Producer(this);
}

ProducerForge.prototype.NewWithRouter = function(router){
  var producer   = this.New();
  
  // Receive Director Events from Emitter
  var dir_emit = new events.EventEmitter();
  var director = this.Director.NewWithEmitter(dir_emit);
  
  // Pass Message to Director
  dir_emit.on('enqueue',function(packet){
    router.route(packet);
  });
  
  // Dropped Messages are Undelivered
  dir_emit.on('dropped',function(packet){
    console.warn('Message Dropped from %s to %s',packet.fromPath,packet.toPath);
  });
  
  producer.director = director;
  producer.router   = router;
  
  return producer;
}

module.exports.forge = function(app){
  return new ProducerForge(app);
}
