// Load Routing Table from Package `routes.json` File
var routes_file  = process.env.FED_ROUTES_FILE || __dirname + '/routes.json';
var defaults = {
  axon      : {
    PORT: 8973
  },
  http      :{
    PORT: 8974
  },
  table_file: routes_file
}

module.exports = defaults;
