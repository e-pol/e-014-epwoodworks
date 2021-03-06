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
  'channel'
  ], function ( _, Backbone, channel) {
  "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        "id" : "EP_SITE_SHELL_ROUTER",
        "routes" : {
          "( )"                    : "requestModLandingPage",
          "costs(/:section)"       : "requestModCosts",
          "costs/api/:request"     : "requestModCostsApi",
          "projects(/:project)"    : "requestModHouseProjects",
          "projects/api/:request"  : "requestModHouseProjectsApi",
          "calcs(/:calc)"          : "requestModEngineerCalcs",
          "calcs/api/:request"     : "requestModEngineerCalcsApi",
          "contacts(/:contact)"    : "requestModContacts",
          "*other"                 : "requestDefault"
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
        console.log('siteRouter initiated');
      },

      // Begin Method /requestMod/
      //
      // Example   : siteRouter.requestMod( {...} )
      // Purpose   :
      //   publish request for module that need the same container
      // Arguments :
      //   * standard publication map
      // Action    :
      //   * publish request data
      // Return    : none
      // Throw     : none
      //
      requestMod : function ( pub_data ) {
        this.publish({
          publisher_id : this.id,
          pub_channel  : channel,
          pub_name     : 'ep-mod-request',
          pub_data     : pub_data
        });
      },
      // End Method /requestMod/

      // Begin Method /requestModApi/
      //
      // Example   : siteRouter.requestModApi( {...} )
      // Purpose   :
      //   publish request for module api
      // Arguments :
      //   * standard publication map
      // Action    :
      //   * publish request data
      // Return    : none
      // Throw     : none
      //
      requestModApi : function ( pub_data ) {
        this.publish({
          publisher_id : this.id,
          pub_channel  : channel,
          pub_name     : 'ep-mod-api-request',
          pub_data     : pub_data
        });
      },
      // End Method /requestModApi/


      // ----------- BEGIN MODULE DEPENDANT CONSTRUCTOR METHODS ------------

      // Begin Method /requestModProjects/
      //
      // Purpose   :
      //   request module ep-mod-house-projects to offer its capabilities
      //   to user
      // Arguments :
      //   * route data
      // Action    :
      //   * make pub_data map
      //   * call requestMod method with pub_data as parameter
      requestModHouseProjects : function ( data ) {
        this.requestMod({
          requested_module_id : 'EP_MOD_HOUSE_PROJECTS',
          route_data          : data
        });
      },
      // End Method /requestModProjects/

      // Begin Method /requestModProjectsApi/
      // Purpose   :
      //   request module ep-mod-house-projects to offer its services
      //   to client, not user
      // Arguments :
      //   * route data
      // Action    :
      //   * make pub_data map
      //   * call requestModApi method with pub_data as parameter
      requestModHouseProjectsApi : function ( data ) {
        this.requestModApi({
          requested_module_id : 'EP_MOD_HOUSE_PROJECTS',
          route_data          : data
        });
      },
      // End Method /requestModProjectsApi/

      requestModLandingPage : function ( data ) {
        this.requestMod({
          requested_module_id : 'EP_MOD_LANDING_PAGE',
          route_data          : data
        });
      },

      requestModCosts : function ( data ) {
        this.requestMod({
          requested_module_id : 'EP_MOD_COSTS',
          route_data          : data
        });
      },

      requestModEngineerCalcs : function ( data ) {
        this.requestMod({
          requested_module_id : 'EP_MOD_ENGINEER_CALCS',
          route_data          : data
        });
      },

      requestModContacts : function ( data ) {
        this.requestMod({
          requested_module_id : 'EP_MOD_CONTACTS',
          route_data          : data
        });
      },

      // ----------- END MODULE DEPENDANT CONSTRUCTOR METHODS ---------------


      requestDefault : function ( data ) {
        this.requestMod({
          requested_module_id : null,
          route_data          : data
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
    init = function ( init_data ) {
      if ( ! init_data ) {
        new SiteRouter( configMap );
      }
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
      start  : start
    };
  }
);
