// The Setup
var fed   = require('../../index');
var table = require('./lib').table;

fed.defaults.axon.PORT = 5001;
fed.defaults.table     = table;

var dir = fed.init();

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
