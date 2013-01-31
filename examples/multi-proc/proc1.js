var fs    = require('fs');
var fed   = require('../../index');
var table = fed.defaults.table;
var json  = JSON.parse( fs.readFileSync( __dirname + '/routes.json') )
json.forEach(function(route){
  var regex   = new RegExp(route.regex);
  var address = route.address;
  table.unshift({
    regex: regex,
    address: address
  })
})
fed.defaults.axon.PORT = 5002;
var dir = fed.init();
var tom = dir.createActor('tom');

function send(){
  setTimeout(function(){
    tom.tell('bob','PONG: Hello From Tom');
  },1000)
}

tom.onMessage = function(message){
  console.log('Tom Received Message: %s',message);
  send();
}
