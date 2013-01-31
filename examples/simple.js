var hub = require('../index').init();

var router  = hub.router;

var tim = router.createNode('tim');
var bob = router.createNode('bob');
var tom = router.createNode('tom');

tom.receive(function(message){
  console.log('--> Tom is Passing a Message to Tim');
  this.tell('/tim',message);
});

tim.receive(function(message,reply){
  console.log('--> Tim Got Message %s',message);
});

console.log('Bob is Sending a Message to Tom');
bob.tell('/tom','hello!');

console.log('Bob is Sending a Message to Tom via Axon');
bob.tell('axon://localhost/tom','Hello via Axon');

