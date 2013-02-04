var url    = require('url');
var assert = require('assert');

function compileRegex(regex){
  var out;
  if(regex instanceof RegExp){
    out = regex;
  }else{
    out = new RegExp(regex);
  }
  return out;
}

function Route(){}

Route.prototype.send = function(message,channel){}

function BasicRoute(regex,address){
  this.regex   = compileRegex(regex);
  this.address = address;
}

BasicRoute.prototype = new Route();
BasicRoute.prototype.send = function(message,channel){
  channel.emit('send',this.address,message);
}

function LoadBalancedRoute(regex,addresses){
  this.regex     = compileRegex(regex);
  this.addresses = addresses;
  this.modulus   = addresses.length;
  this.index     = 0;
}

LoadBalancedRoute.prototype = new Route();
LoadBalancedRoute.prototype.next = function(){
  this.index = this.index + 1 % this.modulus;
  return this.addresses[this.index];
}
LoadBalancedRoute.prototype.send = function(message,channel){
  var next = this.next();
  channel.emit('send',next,message);
}

function BroadcastRoute(regex,addresses){
  this.regex     = compileRegex(regex);
  this.addresses = addresses;
}

BroadcastRoute.prototype = new Route();
BroadcastRoute.prototype.send = function(message,channel){
  this.addresses.forEach(function(address){
    channel.emit('send',address,message);
  });
}

function RouteForge(app){}

RouteForge.prototype.New = function(){
  return new Route(this);
}

RouteForge.prototype.NewFromJSON = function(json){
  var route;
  if(json.address){
    route = new BasicRoute(json.regex,json.address);
  }else if(json.balance){
    route = new LoadBalancedRoute(json.regex,json.balance);
  }else if(json.broadcast){
    route = new BroadcastRoute(json.regex,json.broadcast);
  }else{
    throw new Error('Cannot Parse Route');
  }
  return route;
}

module.exports.forge = function(app){
  return new RouteForge(app);
}
