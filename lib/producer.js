var assert = require('assert');

function Producer(forge){
  this.forge  = forge;
}

function ProducerForge(app){
}

ProducerForge.prototype.New = function(){
  return new Producer(this);
}

ProducerForge.prototype.NewCase = function(director,router,hub){
  var producer = this.New();
  
  return producer;
}

module.exports.forge = function(app){
  return new ProducerForge(app);
}
