var fed = require('../../index');

fed.defaults.transports.axon.PORT_BIND = 5000;
fed.defaults.table_file = 'routes.json';
var prod = fed.init();
var dir  = prod.director;

var tom  = dir.createActor('tom');

console.log('Tom is preparing to broadcast a message');
setTimeout(function(){
  tom.tell('bob','Hello');
},1000);
