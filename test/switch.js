var assert = require('assert');

var Mint   = require('../mint');

describe('Gateway',function(){
  
  it('should initialize new nodes with the switch',function(){
    var app    = {};
    var Node   = Mint.NewFromMethod('NewWithSwitch');
    
    var $      = {};
    
    app.Node   = Node.mock($);
    app.Switch = require('../lib/switch').forge(app);
    
    var sswitch = app.Switch.New();
    var node    = sswitch.node('demo');
    
    assert.equal($['NewWithSwitch'][0][0], sswitch);
  })
  
})
