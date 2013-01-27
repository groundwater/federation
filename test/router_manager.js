var assert = require('assert');
var Mint   = require('../mint');

var Router  = require('../lib/router' );

var RouterManager = require('../lib/router_manager');

describe('Router',function(){
  
  it('should add a `register` route',function(){
    
    var $   = {}
    var app = {}
    
    app.Socket = Mint.New().mock();
    
    var RouterMint = Mint.NewFromObject(Router.proto);
    var router     = RouterMint.mock($);
    
    var rm = RouterManager.forge(app).NewWithRouter(router);
    
    rm.bind('register')
    
    assert.equal($.addRoute.length, 1);
    assert.equal($.addRoute[0][0] , 'register');
    assert.equal($.addRoute[0][1] , rm.emitter);
    
  });
  
  it('should add a route when messaged',function(){
    
  });
  
});
