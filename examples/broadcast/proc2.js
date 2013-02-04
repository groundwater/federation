var fed = require('../../index');

fed.defaults.transports.axon.PORT_BIND = 5001;
fed.defaults.table_file = 'routes.json';
var prod = fed.init();
var dir  = prod.director;

var bob  = dir.createActor('bob');
bob.onMessage = function(message){
  console.log('Bob 1 got message',message);
}
