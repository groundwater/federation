var url    = require('url');
var assert = require('assert');
var events = require('events');

var Mint   = require('../mint');

var app    = {};

app.Gateway = require('../lib/gateway').forge(app);

describe('Gateway',function(){
  
  it('should throw exception for un-routable message',function(){
    
    var address = url.parse('axon://localhost/node1');
    var message = 'hello';
    var gateway = app.Gateway.New();
    
    assert.throws(function(){
      gateway.send(address,message);
    });
    
  });
  
  it('should send message to registered handler',function(){
    
    var address = url.parse('axon://localhost/node1');
    var message = 'hello';
    var gateway = app.Gateway.New();
    
    var emitter = new events.EventEmitter();
    var check   = false;
    
    emitter.on('send',function(_address,_message){
      assert.equal(address,_address);
      assert.equal(message,_message);
      check = true;
    });
    
    gateway.addHandler('axon:',emitter);
    gateway.send(address,message);
    
    assert(check);
    
  });
  
  it('should reject a handler without an `emit` method',function(){
    
    var gateway = app.Gateway.New();
    
    assert.throws(function(){
      gateway.addHandler('axon:',{});
    })
    
  });
  
});
