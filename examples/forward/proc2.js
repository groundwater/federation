var fed = require('../../index');

fed.defaults.transports.axon.PORT_BIND = 5002;
fed.defaults.table_file = 'routes-procs.json';
var prod = fed.init();
var dir  = prod.director;

var tom  = dir.createActor('mirrorverse/tom');
tom.onMessage = function(message){
  console.log('Mirror Tom Received Message "%s"',message);
}
