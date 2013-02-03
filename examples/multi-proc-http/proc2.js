// The Setup
var fed   = require('../../index');

fed.defaults.table_file = __dirname + '/routes.json';
fed.defaults.axon = null;
fed.defaults.http = {PORT: 5011};

var dir = fed.init().director;

// The Actor Magic
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
