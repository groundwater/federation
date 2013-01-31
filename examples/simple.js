var fed = require('../index')

var dir = fed.init().director; // or fed.init( fed.defaults );

var bob = dir.createActor('bob');
var tom = dir.createActor('tom');

bob.onMessage = function(msg){
  console.log('Bob Got Message: %s',msg);
}

tom.onMessage = function(msg){
  console.log('Tom Got Message: %s',msg);
}

bob.tell('tom','hi');
tom.tell('bob','bye');
