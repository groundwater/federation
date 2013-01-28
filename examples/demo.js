var gateway = require('../lib/gateway');
var hub     = require('../lib/hub');
var node    = require('../lib/node');
var payload = require('../lib/payload');
var switchr = require('../lib/switch');

var app     = {};

app.Payload = payload .forge(app);
app.Node    = node    .forge(app);
app.Hub     = hub     .forge(app);
app.Gateway = gateway .forge(app);
app.Switchr = switchr .forge(app);

(function(){
  var gateway = app.Gateway.New();
  var switchr = app.Switchr.New();
  var hub     = app.Hub.NewCase(gateway,switchr);
  var node1   = hub.node('hi');
  
  node1.emit('','hi');
  
})()
