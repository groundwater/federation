function Router(forge){
  this.forge  = forge;
}

function RouterForge(app){
  
}

RouterForge.prototype.New = function(){
  return new Router(this);
}

module.exports.forge = function(app){
  return new RouterForge(app);
}
