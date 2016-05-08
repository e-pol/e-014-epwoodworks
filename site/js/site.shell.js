/**
 * site.shell.js
 * Site shell
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
  'backbone'
  ], function ( $, _, Backbone ) {
    "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      SiteShell, initShell;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    // Begin Constructor /SiteShell/
    //
    // Purpose : Main site controller
    // Returns : New instance
      SiteShell = Backbone.View.extend({

        initialize : function () {
          console.log('siteShell initiated');
        }

    });
    // End Constructor /SiteShell/

    // ---------------------- END MODULE CONSTRUCTORS -----------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin public method /init/
    //
    // Example   : siteShell.init()
    // Purpose   : Instantiate new site shell
    // Arguments : none
    // Action    :
    //   Instantiates new site shell object (type of object is Backbone.View)
    // Returns   : none
    // Throws    : none
    initShell = function () {
      new SiteShell();
    };
    // End public method /init/

    // ------------------------- END PUBLIC METHODS -------------------------

    // return public methods
    return { init : initShell };
  }
);