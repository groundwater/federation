var director = require('../index').init();

var bob = director.createActor('bob');
var tom = director.createActor('tom');

bob.onMessage = function(msg){
  console.log('Bob Got Message: %s',msg);
}

tom.onMessage = function(msg){
  console.log('Tom Got Message: %s',msg);
}

bob.tell('tom','hi');
tom.tell('bob','bye');
