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
  'backbone',
  'site.channel',
  'site.shell.router',
  'modules/ep-mod-house-projects/module'
  ], function ( $, _, Backbone, channel, router,
                moduleHouseProjects ) {
    "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        "id" : 'SITE_SHELL',
        "subscription_list" : {}
      },

      SiteShell, init;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    // Begin Constructor /SiteShell/
    //
    // Purpose : Main site controller
    // Returns : New instance
      SiteShell = Backbone.View.extend( {

        initialize: function () {
          this.id = configMap.id;

          this.subscribeOnInit();

          router.init();
          router.start();
          console.log( 'siteShell initiated' );
        },

        subscribeOnInit: function () {
          //
          // requestProjectsRoute
          //
          this.subscribe({
            subscriber_id : this.id,
            sub_channel   : channel,
            sub_name      : 'requestProjectsRoute',
            callback      : this.onRequestProjectsRoute
          });

          //
          // requestDefaultRoute
          //
          this.subscribe({
            subscriber_id : this.id,
            sub_channel   : channel,
            sub_name      : 'requestDefaultRoute',
            callback      : this.onRequestDefaultRoute
          });

        },

        onRequestProjectsRoute : function ( data ) {
          console.log('onRequestProjectsRoute');
        },

        onRequestDefaultRoute : function ( data ) {
          console.log('onRequestDefaultRoute');
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
    init = function () {
      new SiteShell();
    };
    // End public method /init/

    // ------------------------- END PUBLIC METHODS -------------------------

    // return public methods
    return { init : init };
  }
);