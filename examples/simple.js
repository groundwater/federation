var hub = require('../index').init();

var vertex  = hub.vertex;

var tim = vertex.createNode('tim');
var bob = vertex.createNode('bob');
var tom = vertex.createNode('tom');

tom.receive = function(message,header){
  console.log('--> Tom is Passing a Message to Tim');
  this.send('/tim',message);
};

tim.receive = function(message,header){
  console.log('--> Tim Got Message %s',message);
};

console.log('Bob is Sending a Message to Tom');
bob.send('/tom','hello!');

console.log('Bob is Sending a Message to Tom via Axon');
bob.send('axon://localhost/tom#test','Hello via Axon');

