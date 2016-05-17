var stopListScreen = require('stopListScreen');

module.exports = function(data, status, req) {
  console.log("Handling gtfs response...");
  console.log("Status: " + status);
  stopListScreen.json_data = data;
  stopListScreen.showStops(data);
};