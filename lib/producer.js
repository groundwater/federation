var events = require('events');
var assert = require('assert');

function Producer(forge){
  this.forge  = forge;
}

function ProducerForge(app){
  assert(this.Router   = app.Router,   'Missing Dependency Router');
  assert(this.Director = app.Director, 'Missing Dependency Director');
}

ProducerForge.prototype.New = function(){
  return new Producer(this);
}

ProducerForge.prototype.NewWithRouterAndNode = function(router,node){
  var producer   = this.New();
  
  var emitter  = new events.EventEmitter();
  var director = this.Director.NewWithEmitter(emitter);
  
  emitter.on('enqueue',function(toPath,fromPath,message){
    var address = router.route(toPath);
    var packet  = {
      toPath   : toPath,
      fromPath : fromPath,
      message  : message
    }
    node.send(address,packet);
  });
  
  node.receive = function(packet){
    var toPath   = packet.toPath;
    var fromPath = packet.fromPath;
    var message  = packet.message;
    emitter.emit('dequeue',fromPath,toPath,message);
  }
  
  producer.director = director;
  producer.router   = router;
  
  return producer;
}

module.exports.forge = function(app){
  return new ProducerForge(app);
}
