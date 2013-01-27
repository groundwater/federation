var assert = require('assert');
var Mint   = require('../mint');

var Router  = require('../lib/router' );
var Packet  = require('../lib/packet' );
var Address = require('../lib/address');

describe('Router',function(){
  
  it('should return an undeliverable packet',function(){
    
    var $   = {}
    var app = {}
    
    app.Address = Address;
    app.Packet  = Packet;
  
    var Socket  = Mint.NewFromMethod('emit');    
    var socket  = Socket.mock($);
    
    var router  = Router.forge(app).New();
    var packet  = Packet.NewMessageWithAddress('A','B',null);
  
    router.addRoute('A',socket);
    router.route(packet);
    
    assert.equal($.emit.length, 1);
    assert.equal($.emit[0][0], 'error');
    assert.equal($.emit[0][1], packet);
  
  });
  
  it('should emit a routable message to a socket',function(){
  
    var $   = {};
    var app = {};
  
    app.Address = Address;
    app.Packet  = Packet;
    
    var Socket  = Mint.NewFromMethod('emit');    
    var router  = Router.forge(app).New();
    var route   = 'A';
    var socket  = Socket.mock($);
    var packet  = Packet.NewMessageWithAddress('B','A',null);
  
    router.addRoute(route,socket);
    router.route(packet);
  
    assert.equal($.emit.length, 1);
    assert.equal($.emit[0][0],'packet');
    assert.equal($.emit[0][1], packet);
  
  });
  
  it('should accept packets from a socket',function(){
    
    var app     = {};
    
    var Socket  = Mint.NewFromMethod('on');
    var packet  = Packet.NewMessageWithAddress('B','A',null)
    
    // Create Mocked Socket
    var socket_callback;
    Socket.on('on',function(key,callback){
      assert(key,'packet');
      socket_callback = callback;
    })
    
    // Setup Router to Test
    app.Address = Address;
    app.Packet  = Packet;
    
    var socket  = Socket.mock();
    var router  = Router.forge(app).NewFromSocket(socket);
    
    // Setup a Stub Route
    router.addRoute('A',Mint.NewFromMethod('emit').mock());
    assert(socket_callback);
    
    // Send a Message Through the Socket
    socket_callback(packet);
    
  })

})



