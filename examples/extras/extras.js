var fed = require('../../index');

var dir = fed.init(); // or fed.init( fed.defaults );

var bob = dir.createActor('bob');
var tom = dir.createActor('tom');

bob.onMessage = function(msg){
  console.log('Bob Got Message: %s',msg);
}

tom.onMessage = function(msg,reply){
  console.log('Tom Got Message : %s',msg);
  reply('pong');
}

bob.ask('tom','ping',function(reply){
  console.log('Bob Got Reply   : %s',reply);
});
