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
fed.defaults.axon.PORT = 5001;
var dir = fed.init();
var bob = dir.createActor('bob');

function send(){
  setTimeout(function(){
    bob.tell('tom','PING: Hello From Bob');
  },1000)
}

bob.onMessage = function(message){
  console.log('Bob Received Message: %s',message);
  send();
}

send();
