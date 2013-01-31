var axon = require('axon');

module.exports.setupAxonTransport = function(transport,options){
  
  var PULL_PORT = options.PORT || 8973;
  var PUSH_PORT = 8973;
  
  // Create a Network Interface Using Axon
  
  // Outgoing Connections
  transport.enqueue = function(package){
    var dest = package.head.dst;
    
    var host = dest.hostname;
    var port = parseInt(dest.port) || PUSH_PORT;
    
    var push = axon.socket('push');
    
    push.connect(port,host);
    push.send( JSON.stringify(package) );
    push.on('error', console.log)
  }
  
  // Incoming Connections
  var pull = axon.socket('pull');
  pull.on('message', function(buffer){
    transport.receive( JSON.parse(buffer) );
  });
  pull.bind(PULL_PORT);
  
}