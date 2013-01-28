var hub = require('../index');

var gateway  = hub.gateway;
var router = hub.router;

var tim = router.createNode('tim');
var bob = router.createNode('bob');
var tom = router.createNode('tom');

tom.receive = function(message){
  console.log('Tom is Passing a Message to Tim');
  this.tell('/tim',message);
}

tim.receive = function(message){
  console.log('Tim got Message %s',message);
}

bob.tell('/tom','hello!');
