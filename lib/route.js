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

// --------------------------------
// # Route
// 
// Create a single route of various types.
// Routes do the actual message sending, 
// so each route is free to implement its own
// sending behaviour.

function Route(){}

// ----
// ## Interface for Sending Messages
// 
// Any route can implement the `send` interface.
// The channel passed is an event emitter,
// and messages can be sent with
// ```javascript
// channel.emit('send',url,message);
// ```

Route.prototype.send = function(message,channel){}

// --------------------------------
// ## Basic Route
// 
// A basic route sends to a single remote host.

function BasicRoute(regex,address){
  this.regex   = compileRegex(regex);
  this.address = address;
}

BasicRoute.prototype = new Route();
BasicRoute.prototype.send = function(message,channel){
  channel.emit('send',this.address,message);
}

// --------------------------------
// ## Load Balanced Route
// 
// Load balanced routes maintain a list of remote hosts,
// each message is delivered to exactly one randomly chosen
// host from the list.

function LoadBalancedRoute(regex,addresses){
  this.regex     = compileRegex(regex);
  this.addresses = addresses;
  this.modulus   = addresses.length;
  this.index     = 0;
}

LoadBalancedRoute.prototype = new Route();
LoadBalancedRoute.prototype.next = function(){
  this.index = (this.index + 1) % this.modulus;
  return this.addresses[this.index];
}
LoadBalancedRoute.prototype.send = function(message,channel){
  var next = this.next();
  channel.emit('send',next,message);
}

// --------------------------------
// ## Broadcast Route
// 
// A broadcast route maintains a list of remote hosts,
// each messages is sent to _all_ hosts on the list.

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

// --------------------------------
// ## Forge
// 

function RouteForge(app){}

// ----
// ### Decode from JSON
// 
// Different route types are created from different JSON objects.
// Generally, you must specify one key `address`, `balance`, or `broadcast`.
// Specifying multiple keys is undefined behaviour.
// 
// #### Basic Route
// 
// ```javascript
// { "regex"  : ".*",
//   "address": "axon://10.0.1.1/" }
// ```
// 
// #### Load Balanced Route
// 
// ```javascript
// { "regex"  : ".*",
//   "balance": ["axon://10.0.1.1/","axon://10.0.1.2"]}
// ```
// 
// #### Broadcast Route
// 
// ```javascript
// { "regex"  : ".*",
//   "broadcast": ["axon://10.0.1.1/","axon://10.0.1.2"]}
// ```


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

// --------------------------------
// ## Dependency Injector
// 

module.exports.forge = function(app){
  return new RouteForge(app);
}
