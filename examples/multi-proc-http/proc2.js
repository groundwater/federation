// The Setup
var fed   = require('../../index');
var table = require('./lib').table;

fed.defaults.http.PORT = 5011;
fed.defaults.table     = table;

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
