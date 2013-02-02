var fed = require('../../index');

fed.defaults.axon.PORT  = 5000;
fed.defaults.table_file = 'routes-proxy.json';
fed.init().director.max_forwards = 1;

console.log('Subspace Gateway Initiated');
