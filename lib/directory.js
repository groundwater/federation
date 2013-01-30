function Directory(forge){
  this.forge = forge;
}

function DirectoryForge(app){
    
}

DirectoryForge.prototype.New = function(){
  return new Directory(this);
}

module.exports.forge = function(app){
  return new DirectoryForge(app);
}
