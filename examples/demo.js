var federation = require('../index');
var hub        = federation.join('tcp://127.0.0.1:8973');

// Receiver Node //
var node_recv  = hub.node({
  name: 'demo'
});
node_recv.on('message',function(message){
  console.log('--> Message Received',message);
});
node_recv.on('hi',function(message){
  console.log('[HI] -->',message);
})

// Sender Node //
var node_send  = hub.node({
  name: 'help'
})

setTimeout(function(){
  node_send.emit('demo#hi','hello-world');
},1000);
