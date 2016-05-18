var UI = require('ui');
var moment = require('moment');
var loadingScreen = require('loadingScreen');

var departureListScreen = new UI.Menu({
  backgroundColor: '#658D2E',
  highlightBackgroundColor: '#C2D100',
  highlightTextColor: 'black',
  sections: [{
    items: []
  }]
});

function departureMapper(departure) {
  return { 
    title: departure.published_line_name + ' ' + (departure.destination_display || '-'), 
    subtitle: moment.duration(moment((departure.expected_departure_time || departure.aimed_departure_time)+"00:00") - moment()).humanize(true) + (departure.expected_departure_time? '' : '?'),
  };
}

departureListScreen.showDepartures = function(departures) {
  var listItems = departures.map(departureMapper);
  
  if(listItems.length === 0) {
    listItems = [{
      title: "Beklager",
      subtitle: "Fant ingen bussavganger",
    }];
  }
  
  departureListScreen.items(0, listItems);
  departureListScreen.show();
  loadingScreen.hide();
};

module.exports = departureListScreen;