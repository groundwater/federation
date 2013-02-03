var http = require('http');

module.exports.init = function(transport,options){
  
  var PULL_PORT = options.PORT_BIND;
  var PUSH_PORT = options.PORT_CONNECT;
  
  // Create a Network Interface Using Axon
  
  // Outgoing Connections
  transport.enqueue = function(package){
    
    var dest = package.head.dst;
    
    dest.method = 'POST';
    
    var post = http.request(dest);
    
    post.write( JSON.stringify(package) );
    post.end();
    post.on('error',function(err){
      console.log('HTTP Post Error',err);
    });
    
  }
  
  // Incoming Connections
  var pull = http.createServer(function(req,rep){
    var buffer = '';
    req.on('data',function(data){
      buffer += data;
    });
    req.on('end',function(){
      transport.receive( JSON.parse(buffer) );
    })
  });
  pull.listen(PULL_PORT);
  
}