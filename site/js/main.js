/**
 * site.js
 * Main client side javascript file
 * Created by 123 on 10.05.2016.
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 require
 */



require.config({
  baseUrl : 'js',
  paths   : {
    jquery     : 'libs/jquery/jquery-1.12.3.min',
    bootstrap  : 'libs/bootstrap/bootstrap.min',
    underscore : 'libs/underscore/underscore-min',
    backbone   : 'libs/backbone/backbone-min',
    text       : 'libs/require/text',
    json       : 'libs/require/json',
    shell      : 'shell/',
    channel    : 'shell/site.channel'
  },
  shim    : {
    'backbone'   : {
      deps    : ['jquery', 'underscore'],
      exports : 'Backbone'
    },
    'underscore' : {
      exports : '_'
    },
    'bootstrap'  : {
      deps    : ['jquery'],
      exports : 'bootstrap'
    },
    'json'       : {
      deps : ['text']
    }
  }
});

require([
  'bootstrap',
  'shell/site'
], function ( bootstrap, site ) {
  "use strict";

  site.init();

});
