var hub = require('../index');

var gateway  = hub.gateway;
var switcher = hub.switcher;

var tim = switcher.createNode('tim');
var bob = switcher.createNode('bob');
var tom = switcher.createNode('tom');

tom.receive = function(message){
  console.log('Tom is Passing a Message to Tim');
  this.tell('/tim',message);
}

tim.receive = function(message){
  console.log('Tim got Message %s',message);
}

bob.tell('/tom','hello!');
