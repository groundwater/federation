function Mock(mint){}

function Mint(forge){
  this.forge    = forge;
  this.calls    = {};
  this.instance = {};
}

Mint.prototype.on = function(property,call){
  this.calls[property] = call;
}

Mint.prototype.log = function(name,entry){
  if(!this._log[name]) this._log[name] = [];
  this._log[name].push(entry);
}

Mint.prototype.mockFunction = function(name){
  var self = this;
  function mock(){
    
    // Record the Method Call
    self.log(name,arguments);
    
    // Perform the Clalback
    var callback = self.calls[name];
    if(callback){
      if(callback instanceof Function){
        return callback.apply(self,arguments);
      }else{
        return callback
      }
    }else{
      return null
    }
    
  }
  
  return mock;
}

Mint.prototype.mockString = function(name){
  var self = this;
  function mock(){
    // Record the property access
    self.log(name,true);
    
    // Return the String
    return self.calls[name] || '';
  }
  return mock;
}

Mint.prototype.mockObject = function(name){
  var self = this;
  function mock(){
    // Record the property access
    self.log(name,true);
    
    // Return the Property
    return self.calls[name] || {};
  }
  return mock;
}

Mint.prototype.mock = function(log){
  
  var mock = new Mock();
  var self = this;
  
  self._log = log || {}
  
  self.methods.forEach(function(key){
    mock[key] = self.mockFunction(key)
  });
  
  self.strings.forEach(function(key){
    mock.__defineGetter__(key,self.mockString(key))
  })
  
  self.objects.forEach(function(key){
    mock.__defineGetter__(key,self.mockObject(key))
  })
  
  return mock;
}

function MintForge(){}

MintForge.prototype.New = function(){
  var mint = new Mint(this);
  mint.methods = [];
  mint.strings = [];
  mint.objects = [];
  return mint;
}

MintForge.prototype.NewFromPrototype = function(proto){
  var mint = this.New();
  
  Object.keys(proto).forEach(function(key){
    
    var prop = proto[key];
    
    if(prop === String){
      mint.strings.push(key)
    }else if(prop === Object){
      mint.objects.push(key)
    }else if(prop === Array){
      mint.objects.push(key)
    }else if(typeof prop === 'function'){
      mint.methods.push(key)
    }else{
      console.warn('Mocked Prototype Has Missing Types')
    }
    
  })
  
  return mint;
}

MintForge.prototype.NewFromObject = function(obj){
  var mint = this.New();
  mint.methods    = Object.keys(obj);
  mint.instance   = obj;
  return mint;
}

MintForge.prototype.NewWithProperties = function(methods,strings,objects){
  var mint = this.New();
  if (methods) mint.methods = methods;
  if (strings) mint.strings = strings;
  if (objects) mint.objects = objects;
  return mint;
}

MintForge.prototype.NewFromMethods = function(methods){
  var mint = this.New();
  mint.methods = methods;
  return mint;
}

MintForge.prototype.NewFromMethod = function(property){
  return this.NewFromMethods([property]);
}

// Dual Export Style
var singleton  = new MintForge();
module.exports = singleton;
module.exports.forge = function(){
  return singleton;
}
