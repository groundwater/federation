function Route(){}

function RouteForge(app){
  
}

RouteForge.prototype.New = function(){
  return new Route(this);
}

RouteForge.prototype.NewFromJSON = function(json){
  var regex_json = json.regex;
  var address    = json.address;
  var regex;
  if(regex_json instanceof RegExp){
    regex = regex_json;
  }else{
    regex = new RegExp(regex_json);
  }
  var route     = this.New();
  route.regex   = regex;
  route.address = address;
  return route;
}

module.exports.forge = function(app){
  return new RouteForge(app);
}
