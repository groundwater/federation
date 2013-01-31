function Route(regex,address){
  this.regex   = regex;
  this.address = address;
}

function Router(forge){
  this.forge  = forge;
}

Router.prototype.table = [];
Router.prototype.route = function(toPath){
  
  for(var i=0; i<this.table.length; i++){
    
    var route = this.table[i];
    var regex = route.regex;
    
    if(toPath.match(regex)){
      return route.address
    }
    
  }
  
  // TODO
  throw new Error('No Route Found');
  
}

function RouterForge(app){
  
}

RouterForge.prototype.NewWithTable = function(table){
  var router   = this.New();
  router.table = table;
  return router;
}

RouterForge.prototype.New = function(){
  return new Router(this);
}

module.exports.forge = function(app){
  return new RouterForge(app);
}

