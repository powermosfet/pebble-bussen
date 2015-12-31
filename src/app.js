/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
// var Vector2 = require('vector2');

var main = new UI.Menu({
  backgroundColor: '#658D2E',
  highlightBackgroundColor: '#C2D100',
  highlightTextColor: 'black',
    sections: [{
      items: [{
        title: 'Lyefjell',
        subtitle: '234m'
      }, {
        title: 'Heilovegen',
        subtitle: '423m'
      }]
    }]
  });

main.show();

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