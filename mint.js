function Mock(mint){
  this._mock       = {};
  this._mock.calls = {};
}

function Mint(forge){
  this.forge = forge;
  this.calls = {};
}

Mint.prototype.on = function(method,call){
  this.calls[method] = call;
}

Mint.prototype.mock = function(log){
  
  var mock = new Mock();
  var self = this;
  
  // Optionally use an external log
  mock._mock.log = log || {};
  mock._mock.instance = this.instance;
  
  this.methods.forEach(function(method){
    mock[method] = function(){
      
      // Record Call
      if( !mock._mock.log[method] )
        mock._mock.log[method] = [];
      mock._mock.log[method].push(arguments);
      
      // Possibly Invoke Call
      if(self.calls[method])
        return self.calls[method].apply(mock,arguments);
      
    }
  })
  return mock;
}

function MintForge(){}

MintForge.prototype.New = function(){
  var mint = new Mint(this);
  mint.methods = [];
  return mint;
}

MintForge.prototype.NewFromObject = function(obj){
  var mint = this.New();
  mint.methods  = Object.keys(obj);
  mint.instance = obj;
  return mint;
}

MintForge.prototype.NewFromMethods = function(methods){
  var mint = this.New();
  mint.methods = methods;
  return mint;
}

MintForge.prototype.NewFromMethod = function(method){
  return this.NewFromMethods([method]);
}

// Dual Export Style
var singleton  = new MintForge();
module.exports = singleton;
module.exports.forge = function(){
  return singleton;
}
