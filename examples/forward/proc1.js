var fed = require('../../index');

fed.defaults.transports.axon.PORT_BIND = 5001;
fed.defaults.table_file = 'routes-procs.json';
var prod = fed.init();
var dir  = prod.director;

var tom  = dir.createActor('universe/tom');

function portal(timer){
  console.log('// Portal Opening \\\\');
  tom.tell('mirrorverse/tom','Hello From Tom');
  clearInterval(timer);
}

var count = 6;
var timer = setInterval(function(){
  if(--count==0){
    portal(timer);
  }else{
    console.log('Opening Portal to Mirror-Verse in T-minus %d Second', count);
  }
},1000)
