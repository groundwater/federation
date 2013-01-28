var events = require('events');
var assert = require('assert');

function Payload(forge){
  this.forge  = forge;
}

function PayloadForge(app){
  //
}

PayloadForge.prototype.New = function(){
  return new Payload(this);
}

PayloadForge.prototype.NewCase = function(src,dst,msg){
  var payload = this.New();
  
  payload.src = src;
  payload.dst = dst;
  payload.msg = msg;
  
  return payload;
}

module.exports.forge = function(app){
  return new PayloadForge(app);
}
