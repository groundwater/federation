var fed = require('../../index');

fed.defaults.transports.axon.PORT_BIND = 5000;
fed.defaults.table_file = 'routes-proxy.json';
fed.init().director.max_forwards = 1;

console.log('Subspace Gateway Initiated');
