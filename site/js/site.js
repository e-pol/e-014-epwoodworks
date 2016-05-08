/**
 * site.js
 * Main client side javascript file
 * Created by 123 on 08.05.2016.
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
    bootstrap  : 'libs/bootstrap/bootstrap.min',
    jquery     : 'libs/jquery/jquery-1.12.3.min',
    underscore : 'libs/underscore/underscore-min',
    backbone   : 'libs/backbone/backbone-min',
    text       : 'libs/require/text',
    json       : 'libs/require/json'
  }
});

require(['site.shell'], function ( siteShell ) {
  "use strict";

  siteShell.init();

});