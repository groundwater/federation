function Producer(forge){
  this.forge  = forge;
}

function ProducerForge(app){
  
}

ProducerForge.prototype.New = function(){
  return new Producer(this);
}

module.exports.forge = function(app){
  return new ProducerForge(app);
}
