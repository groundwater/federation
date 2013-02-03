// The Setup
var fed   = require('../../index');

fed.defaults.transports.axon.PORT_BIND = 5002;
fed.defaults.table_file = __dirname + '/routes.json';

var dir = fed.init().director;

// The Actor Magic
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
