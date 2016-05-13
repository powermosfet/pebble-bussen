/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var ajax = require('ajax');
// var Vector2 = require('vector2');

var baseUrl = "https://pebble-sanntid-backend.herokuapp.com/";
var stopsUrl = baseUrl + "api/gtfs/stops/";
var siriUrl = baseUrl + "api/siri/getstopmonitoring/";

var loadingScreen = new UI.Card({
  title: "Laster..."
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
  var url = stopsUrl + coords + "/";
  console.log("url: " + url);
  ajax({ url: url, type: 'json' },
    function(data, status, req) {
      console.log("Handling response...");
      main.sections([{
        items: data.map(function(s){ return { title: s.stop_name, subtitle: "" + s.distance + "m" };})
      }]);
      main.show();
    }
  );
});

main.on('select', function(index) {
  var depList = new UI.Menu({
  backgroundColor: '#658D2E',
  highlightBackgroundColor: '#C2D100',
  highlightTextColor: 'black',
    sections: [{
      items: [{
        title: '50 Bryne',
        subtitle: '5min'
      }, {
        title: '56 Undheim',
        subtitle: 'ca 13min'
      },{
        title: '50 Bryne',
        subtitle: 'ca 35min'
      }]
    }]
  });
  depList.show();
});