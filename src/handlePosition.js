var ajax = require('ajax');
var config = require('config');
var loadingScreen = require('loadingScreen');
var handleGtfsResponse = require('handleGtfsResponse');

module.exports = function(pos) {
  var coords = "" + pos.coords.latitude + "," + pos.coords.longitude;
  console.log(coords);
  
  var url = config.stopsUrl + "?coords=" + coords;
  console.log("url: " + url);
  
  loadingScreen.showMessage("henter busstopp");
  ajax({ url: url, type: 'json' }, handleGtfsResponse);
};