var assert  = require('assert');
var Address = require('../lib/address');

describe('Address',function(){
  
  it('should split with defaults',function(){
    var address = Address.NewFromString('x');
    assert(address)
    assert.equal(address.path,'x')
    assert.equal(address.name,'message')
  })
  
  it('should split with name',function(){
    var address = Address.NewFromString('x#y');
    assert(address);
    assert.equal(address.path, 'x');
    assert.equal(address.name, '#y');
  })
  
})
