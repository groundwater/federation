var routes = require('./lib').routes;

// Load Routing Table from Package `routes.json` File
var routes_file  = process.env.FED_ROUTES_FILE || __dirname + '/routes.json';
var routes_table = routes.Load( routes_file );
var defaults = {
  axon      : {
    PORT: 8973
  },
  http      :{
    PORT: 8974
  },
  table     : routes_table
}

module.exports = defaults;
