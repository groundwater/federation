// The Setup
var fed   = require('../../index');

fed.defaults.table_file = __dirname + '/routes.json';
fed.defaults.axon = null;
fed.defaults.http = {PORT: 5012};

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
