function Table(forge){
  this.forge  = forge;
  this.routes = {};
}

function match(matcher,value){
  if( value.match(matcher) ){
    return true;
  }else{
    return false;
  }
}

Table.prototype.match = function(name){
  var keys = Object.keys(this.routes).sort();
  for(var i=0; i<keys.length; i++){
    var key     = keys[i];
    var matcher = this.routes[key].regex;
    if( match(matcher,name) ) return this.routes[key];
  }
  return null;
}

Table.prototype.addRoute = function(rank,route){
  this.routes[rank] = route;
}

Table.prototype.removeRanked = function(rank){
  delete this.routes[rank];
}

function TableForge(app){}

TableForge.prototype.New = function(){
  return new Table(this);
}

module.exports.forge = function(app){
  return new TableForge(app);
}

// Tests

if(!module.parent){
  
  var assert = require('assert');
  
  var tf = new TableForge({});
  var tb = tf.New();
  var r1 = {
    regex: /bob/,
    address: 'http://localhost/'
  }
  var r2 = {
    regex: /tim/,
    address: 'http://localhost:9999/'
  }
  
  tb.addRoute(1,r1);
  tb.addRoute(2,r2);
  
  var address1 = tb.match('bob');
  var address2 = tb.match('tom');
  
  assert.equal(address1,r1);
  assert.equal(address2,null);
  
}








