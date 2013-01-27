var DEFAULT_NAME = 'message';

// Class //
function Address(){}

// Forge //
function AddressForge(){}

AddressForge.prototype.New = function(){
  return new Address(this);
}

AddressForge.prototype.NewFromString = function(string){
  var split    = string.split('#',2);
  var path     = split[0];
  var address  = this.New();
  var name;
  
  if(split.length==2){
    name = '#' + split[1];
  }else{
    name = DEFAULT_NAME;
  }
  
  address.path = path;
  address.name = name;
  
  return address;
}

// Address has no dependencies so we
// create a singleton instance
var singleton  = new AddressForge();

// Conform to both direct require and forge patterns
module.exports = singleton;
module.exports.proto = Address.prototype;
module.exports.forge = function(){
  return singleton;
}
