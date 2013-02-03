function Router(forge){
  this.forge  = forge;
}

Router.prototype.route = function(packet){
  var toPath  = packet.toPath;
  var route   = this.table.match(toPath);
  if(route){
    this.emitter.emit('send',route.address,packet);
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

if(!module.parent){
  
  var events = require('events');
  var Table  = require('./table').forge({});
  
  var tb     = Table.New();
  
  var route  = {regex:/^home$/, address:'http://localhost/'};
  tb.addRoute(0,route);
  
  var emit   = new events.EventEmitter();
  emit.on('send',function(address,packet){
    console.log('Send Packet for %s to %s',packet.toPath,address);
  })
  
  var rf     = new RouterForge({});
  var rt     = rf.NewWithTableAndEmitter(tb,emit);
  
  var packet = {
    toPath: 'home',
    fromPath: 'away',
    message: 'hi'
  }
  rt.route(packet);
  
}