// ---------------------------
// ## Routing Table
// 
// A routing table is an ordered list of routes.
// Incoming messages are matched against routes.
// The first matching route is given the message.
// 
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

// ----
// ### Match a Name
// 
// Return the first route to match against `name`
// 
Table.prototype.match = function(name){
  var keys = Object.keys(this.routes).sort();
  for(var i=0; i<keys.length; i++){
    var key     = keys[i];
    var matcher = this.routes[key].regex;
    if( match(matcher,name) ) return this.routes[key];
  }
  return null;
}

// ---
// ### Add Route
// 
// Add a route at rank `n`.
// Routes added will replace existing routes at rank `n`.
// 
Table.prototype.addRoute = function(rank,route){
  this.routes[rank] = route;
}

// ----
// ### Remove Route
// 
// Delete a route at rank `n`.
// You should probably not leave empty routes in your table
// 
Table.prototype.removeRanked = function(rank){
  delete this.routes[rank];
}

// ---------------------------
// ## Forge
// 
function TableForge(app){}

// ----
// ### New Table
// 
// Create a new empty table.
TableForge.prototype.New = function(){
  return new Table(this);
}

// --------------------------------
// ## Dependency Injector
// 
module.exports.forge = function(app){
  return new TableForge(app);
}

