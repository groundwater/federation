var assert = require('assert');

// Class //
function Router(forge){
  this.forge  = forge;
  this.routes = {};
}

// Add an outgoing route
Router.prototype.addRoute = function(path,socket){
  this.routes[path] = socket;
}

// Route a message to its destination based on the packet address
Router.prototype.route = function(packet){
  var src, dst;
  
  assert( dst = packet.dst , 'Packet Must Include Destination');
  assert( src = packet.src,  'Packet Must Include Source');
  
  var address = this.forge.Address.NewFromString(dst);
  var path    = address.path;
  
  var route   = this.routes[path];
  
  if(route){
    // Route Exists
    route.emit('packet',packet);
  }else{
    // No Route Exists
    var source_address = this.forge.Address.NewFromString(src);
    var source_path    = source_address.path;
    var source_route   = this.routes[source_path];
    if( source_route ){
      source_route.emit('error',packet);
    }else{
      console.warn('No Route to Source');
    }
  }
  
}

// Forge //
function RouterForge(app){
  assert( this.Packet  = app.Packet  , 'Missing Dependency Packet');
  assert( this.Address = app.Address , 'Missing Dependency Address');
}

RouterForge.prototype.New = function(){
  return new Router(this);
}

RouterForge.prototype.NewFromSocket = function(recv){
  var router = this.New();
  
  // Wire Router to Socket
  recv.on('packet',function(packet){
    router.route(packet);
  });
  
  return router;
}

// Export //
module.exports.proto = Router.prototype;
module.exports.forge = function(app){
  return new RouterForge(app);
}

