/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
var moment = require('moment');

var config = require('config.js');

moment.locale('nb');

var loadingScreen = new UI.Card({
  backgroundColor: '#658D2E',
  title: "Laster...",
  subtitle: "henter lokasjon",
});

var main = new UI.Menu({
  backgroundColor: '#658D2E',
  highlightBackgroundColor: '#C2D100',
  highlightTextColor: 'black',
});

loadingScreen.show();

navigator.geolocation.getCurrentPosition(function(loc) {
  var coords = "" + loc.coords.latitude + "," + loc.coords.longitude;
  console.log(coords);
  var url = config.stopsUrl + "?coords=" + coords;
  console.log("url: " + url);
  loadingScreen.subtitle("henter busstopp");
  loadingScreen.backgroundColor('#658D2E');
  ajax({ url: url, type: 'json' },
    function(data, status, req) {
      console.log("Handling gtfs response...");
      main.json_data = data;
      main.items(0, data.map(function(s){ return { title: s.stop_name, subtitle: "" + s.distance + "m", stop_id: s.stop_id };}));
      main.show();
      loadingScreen.hide();
    }
  );
});

main.on('select', function(e) {
  console.log("Selected");
  var stop_id = e.item.stop_id;
  loadingScreen.subtitle('Henter sanntidsdata');
  loadingScreen.backgroundColor('#658D2E');
  loadingScreen.show();
  var url = config.siriUrl + "?stop_id=" + stop_id + "&timestamp=" + (new Date()).toISOString();
  console.log(url);
  ajax({ url: url, type: 'json' },
    function(data, status, req) {
      console.log("Handling siri response...");
      var departures = data.map(function(d){
        return { 
          title: d.published_line_name + ' ' + d.destination_display, 
          subtitle: moment.duration(moment((d.expected_departure_time || d.aimed_departure_time)+"00:00") - moment()).humanize(true) + (d.expected_departure_time? '' : '?'),
        };
      });
      var depList = new UI.Menu({
        backgroundColor: '#658D2E',
        highlightBackgroundColor: '#C2D100',
        highlightTextColor: 'black',
          sections: [{
            items: departures
          }]
      });
      depList.show();
      loadingScreen.hide();
    }
  );
});