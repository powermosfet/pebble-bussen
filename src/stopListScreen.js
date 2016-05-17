var UI = require('ui');
var config = require('config.js');
var loadingScreen = require('loadingScreen');

function stopMapper(stop) {
  return { 
    title: stop.stop_name, 
    subtitle: "" + stop.distance + "m",
    stop_id: stop.stop_id 
  };
}

var stopListScreen = new UI.Menu({
  backgroundColor: config.backgroundColor,
  highlightBackgroundColor: config.highlightBackgroundColor,
  highlightTextColor: 'black',
});

stopListScreen.showStops = function(stops) {
  stopListScreen.items(0, stops.map(stopMapper));
  stopListScreen.show();
  loadingScreen.hide();
};

module.exports = stopListScreen;