var fed = require('../../index');

var dir = fed.init().director; // or fed.init( fed.defaults );

var bob = dir.createActor('bob');
var tom = dir.createActor('tom');

bob.onMessage = function(msg){
  console.log('Bob Got Message: %s',msg);
}

tom.onMessage = function(msg,reply){
  console.log('Tom Got Message : %s',msg);
  reply('pong');
}

console.log('Waiting for Reply from Tom');
bob.ask('tom','ping',function(err,reply){
  console.log('Bob Got Reply   : %s',reply);
});

console.log('Waiting for Reply from June');
bob.ask('june','ping',function(err,reply){
  if(err) console.log('Ask Error',err);
});
