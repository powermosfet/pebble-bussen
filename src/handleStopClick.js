var ajax = require('ajax');
var config = require('config');
var loadingScreen = require('loadingScreen');
var handleSiriResponse = require('handleSiriResponse');

module.exports = function(e) {
  console.log("Selected " + JSON.stringify(e.item));
  var stop_id = e.item.stop_id;
  
  loadingScreen.showMessage('Henter sanntidsdata');
  var url = config.siriUrl + "?stop_id=" + stop_id + "&timestamp=" + (new Date()).toISOString();
  console.log(url);
  
  ajax({ url: url, type: 'json' }, handleSiriResponse);
};