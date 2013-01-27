var assert = require('assert');
var events = require('events');

function RouterManager(forge){
  this.forge   = forge;
  this.emitter = new events.EventEmitter();
}

RouterManager.prototype.bind = function(path){
  this.router.addRoute(path,this.emitter);
}

function RouterManagerForge(app){
  assert( this.Socket = app.Socket, 'Missing Dependency Socket' );
}

RouterManagerForge.prototype.New = function(){
  return new RouterManager(this);
}

RouterManagerForge.prototype.NewWithRouter = function(router){
  var rm = this.New();
  rm.router = router;
  return rm;
}

module.exports.forge = function(app){
  return new RouterManagerForge(app);
}
