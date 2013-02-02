var fs    = require('fs');

var table = [];
var json  = JSON.parse( fs.readFileSync( __dirname + '/routes.json') )
json.forEach(function(route){
  var regex   = new RegExp(route.regex);
  var address = route.address;
  table.push({
    regex: regex,
    address: address
  })
})

module.exports.table = table;
