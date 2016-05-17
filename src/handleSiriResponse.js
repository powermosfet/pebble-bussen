var moment = require('moment');
var departureListScreen = require('departureListScreen');

moment.locale('nb');

module.exports = function(data, status, req) {
      console.log("Handling siri response...");
      
      departureListScreen.showDepartures(data);
};