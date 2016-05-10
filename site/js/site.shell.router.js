/**
 * site.shell.router.js
 * Site main router
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
  'underscore',
  'backbone',
  'site.channel'
  ], function ( _, Backbone, channel) {
  "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        "id" : "EP_SITE_SHELL_ROUTER",
        "routes" : {
          "projects(/:project_id)" : "onProjectsRoute",
          "*other"                 : "onDefaultRoute"
        }
      },
      stateMap = {},
      SiteRouter, config, init, start
    ;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    // Begin Constructor /SiteRouter/
    //
    // Purpose : Site router
    // Returns : New instance
    //
    SiteRouter = Backbone.Router.extend({

      initialize : function () {
        this.id = configMap.id;
        console.log('siteRouter initiated');
      },

      onProjectsRoute : function ( data ) {
        this.publish({
          publisher_id : this.id,
          pub_channel  : channel,
          pub_name     : 'requestProjectsRoute',
          pub_data     : data
        });
      },

      onDefaultRoute : function ( data ) {
        this.publish({
          publisher_id : this.id,
          pub_channel  : channel,
          pub_name     : 'requestDefaultRoute',
          pub_data     : data
        });
      }

    });
    // End Constructor /SiteRouter/

    // ---------------------- END MODULE CONSTRUCTORS -----------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin public method /configRouter/
    //
    // Example   : siteRouter.configRouter()
    // Purpose   : Configure the router prior to initialization
    // Arguments : none
    // Action    :
    //   The internal configuration data structure (configMap) is
    //   updated with provided arguments. No other actions are taken.
    // Returns   : none
    // Throws    : JavaScript error object and stack trace on
    // unacceptable or missing arguments
    //
    config = function () {

    };
    // End public method /configRouter/

    // Begin public method /initRouter/
    //
    // Example   : siteRouter.init()
    // Purpose   : Directs router to offer its capability to the site shell
    // Arguments : none
    // Action    :
    //   * Triggers global events on route change
    //   * Sets bookmarkable routes depending on requests
    //   * Updates browser history on demand
    // Returns   : none
    // Throws    : none
    //
    init = function () {
      new SiteRouter( configMap );
    };
    // End public method /initRouter/

    // Begin Public method /startHistory/
    // Example   : siteRouter.startHistory()
    // Purpose   :
    //   Directs router to begin monitoring hashchange events
    //   and dispatching routes
    // Arguments : none
    // Action    :
    //   * Call Backbone.history.start() after all routers have been created
    // Return    : none
    // Throws    : none
    //
    start = function () {
      Backbone.history.start();
    };
    // End Public method /startHistory/

    // ------------------------- END PUBLIC METHODS -------------------------


    // return public methods
    return {
      config : config,
      init   : init,
      start : start
    };
  }
);
