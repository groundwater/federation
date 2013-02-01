var fs    = require('fs');

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

module.exports.load = load;
