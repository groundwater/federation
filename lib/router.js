function Router(forge){
  this.forge  = forge;
}

Router.prototype.route = function(packet){
  var toPath  = packet.toPath;
  var route   = this.table.match(toPath);
  if(route){
    route.send(packet,this.emitter);
  }else{
    this.emitter.emit('error',new Error('No Route to Path ' + toPath));
  }
}

function RouterForge(app){
  
}

RouterForge.prototype.NewWithTableAndEmitter = function(table,emitter){
  var router     = this.New();
  router.table   = table;
  router.emitter = emitter;
  return router;
}

RouterForge.prototype.New = function(){
  return new Router(this);
}

module.exports.forge = function(app){
  return new RouterForge(app);
}
