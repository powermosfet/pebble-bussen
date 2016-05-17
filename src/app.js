/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var handlePosition = require('handlePosition');
var loadingScreen = require('loadingScreen');
var stopListScreen = require('stopListScreen');
var handleStopClick = require('handleStopClick');

loadingScreen.showMessage('Finner posisjon');

navigator.geolocation.getCurrentPosition(handlePosition);

stopListScreen.on('select', handleStopClick);