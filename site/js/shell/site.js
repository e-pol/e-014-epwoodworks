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
 define
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'shell/site.core',
  'shell/site.shell'
], function ( $, _, Backbone, siteCore, siteShell ) {
  "use strict";

  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var init;

  // --------------------- END MODULE SCOPE VARIABLES ---------------------


  //-------------------------- BEGIN PUBLIC METHODS -----------------------

  // Begin public method /init/
  //
  // Example   : site.init()
  // Purpose   : Initializes new site
  // Arguments : none
  // Action    :
  //   * Configure site core (Client side framework)
  //   * Initialize new site shell
  // Returns   : none
  // Throws    : none
  init = function () {
    siteCore.config();
    siteShell.init();
  };
  // End public method /init/

  // ------------------------- END PUBLIC METHODS -------------------------


  // return public methods
  return { init : init };
});