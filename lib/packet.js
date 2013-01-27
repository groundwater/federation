function Packet(forge){
  this.forge = forge;
}

function PacketForge(){}

PacketForge.prototype.New = function(){
  var packet = new Packet();
  return packet;
}

PacketForge.prototype.NewMessageWithAddress = function(src,dst,msg){
  var packet = this.New();
  packet.src = src;
  packet.dst = dst;
  packet.msg = msg;
  return packet;
}

PacketForge.prototype.NewErrorWithAddress = function(src,dst,err){
  var packet = this.New();
  packet.src = src;
  packet.dst = dst;
  packet.err = err;
  return packet;
}

var singleton = new PacketForge();
module.exports = singleton;
module.exports.proto = Packet.prototype;
module.exports.forge = function(app){
  return singleton;
}
