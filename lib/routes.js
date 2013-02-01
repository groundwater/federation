var fs    = require('fs');

// TODO Cleanup 
function load(file){
  var table = [];
  var json  = JSON.parse( fs.readFileSync( file ) );
  json.forEach(function(route){
    var regex   = new RegExp(route.regex);
    var address = route.address;
    table.push({
      regex: regex,
      address: address
    })
  })
  return table;
}

function Routes(){}

RoutesForge.prototype.Load = function(path){
  return load(path);
}

function RoutesForge(app){
  
}

module.exports = singleton = new RoutesForge();
module.exports.load = load;
module.exports.forge = function(app){
  return singleton;
}
