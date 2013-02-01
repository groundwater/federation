var events = require('events');
var assert = require('assert');

// The Producer provides the Modules Client API
function Producer(forge){
  this.forge  = forge;
}

function ProducerForge(app){
  assert(this.Director = app.Director, 'Missing Dependency Director');
}

ProducerForge.prototype.New = function(){
  return new Producer(this);
}

ProducerForge.prototype.NewWithRouterAndNode = function(router,node){
  var producer   = this.New();
  
  // Receive Director Events from Emitter
  var emitter  = new events.EventEmitter();
  var director = this.Director.NewWithEmitter(emitter);
  
  // Pass Message to Director
  emitter.on('enqueue',function(packet){
    var address = router.route(packet.toPath);
    node.send(address,packet);
  });
  
  // Dropped Messages are Undelivered
  emitter.on('dropped',function(packet){
    console.warn('Message Dropped from %s to %s',packet.fromPath,packet.toPath);
  });
  
  // Pass Incoming Network Messages to Director
  node.receive = function(packet){
    director.enqueue(packet);
  }
  
  producer.director = director;
  producer.router   = router;
  
  return producer;
}

module.exports.forge = function(app){
  return new ProducerForge(app);
}
