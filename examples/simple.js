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

console.log('Bob is Asking Tom');
bob.ask('/tom','How are you?');

console.log('Bob is Sending a Message to Tom via Axon');
bob.tell('axon://localhost/tom','Hello via Axon');

// Requst-Reply

var jill = router.createNode('jill');
var jack = router.createNode('jack');

jill.receive(function(message,reply){
  console.log('Jill received Message: %s',message);
  console.log('Message Has Reply Address', reply.replyAddress.href );
  reply('ACK');
});

jack.ask('/jill','SYN').receive(function(message){
  console.log('--> ACK');
}).error(function(err){
  console.log('Got Error',err);
})
