/**
 * Created by 123 on 11.05.2016.
 * Main module controller
 * main.view.js
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 define
 */

// The main controller API
// -----------------
//
// The main controller is available at requireJS path:
// 'epModHouseProjects/views/main.view'.
//
// The main controller provides methods and events to manage the module
// 'ep-mod-house-projects'.
//
// Its Public methods include:
//   * init() - instantiate new module controller. If module controller has
//   been initiated previously it does nothing and return false
//   * config() - set module adjustments
//   * start() - direct module to begin offering its capabilities to user
//   * stop() - direct module to end offering its capabilities to user
//   * requestService() - request module special services without starting it
//
define([
  'jquery',
  'underscore',
  'backbone'
  ], function( $, _, Backbonel ) {
  "use strict";


    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        "id" : "EP_MOD_HOUSE_PROJECTS_MAIN_VIEW"
      },

      stateMap = {
        $container   : null,
        is_initiated : false,
        module       : null
      },

      MainView, mainView, config, init, start, stop, requestService;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    MainView = Backbonel.View.extend( {
      initialize: function ( init_data ) {
        console.log( '(ep-mod-hp) mainView initiated' );
      },

      render: function () {
      }

    });

    // --------------------- END MODULE CONSTRUCTORS ------------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin Public method /init/
    //
    // Example   : mainView.init()
    // Purpose   : Instantiate new controller
    // Arguments :
    //   * init_data - initialization map object
    //     ** $container - html element to contain module html
    // Action    :
    //   * instantiate controller as new Backbone.View
    // Returns   :
    //   * true  - controller successfully initiated
    //   * false - controller was initiated previously
    // Throws    : none
    //
    init = function ( init_data ) {
      if ( ! stateMap.is_initiated ) {
        stateMap.is_initiated = true;
        stateMap.module = new MainView( init_data );
        return true;
      }
      return false;
    };
    // End Public method /init/

    // Begin Public method /start/
    //
    // Example   : mainView.start()
    // Purpose   : direct module to begin offering its capabilities to user
    // Arguments :
    //   * data - proposed data
    // Action    :
    // Returns   : none
    // Throws    : none
    //
    start = function ( data ) {
      stateMap.module.start( data );
    };
    // End Public method /start/

    // ------------------------- END PUBLIC METHODS -------------------------


    // Return Public methods
    return {
      config         : config,
      init           : init,
      requestService : requestService
    };

  }
);
