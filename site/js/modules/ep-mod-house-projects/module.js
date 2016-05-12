/**
 * module.js
 * Module House Projects
 * Created by 123 on 08.05.2016.
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 require, define
 */

require.config({
  paths   : {
    epModHouseProjects : 'modules/ep-mod-house-projects/'
  }
});

define([
  'jquery',
  'underscore',
  'backbone',
  'channel',
  'epModHouseProjects/views/main.view'
  ], function( $, _, Backbone, channel, MainView ) {
  "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        id : 'EP_MOD_HOUSE_PROJECTS'
      },
      stateMap = {
        $container : null,
        is_active  : false,
        hash       : null,
        route_data : {},
        subs       : {
          mainView : null
        }
      },
      ModuleHouseProjects, config, init;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    // Begin Constructor /ModuleHouseProjects/
    //
    // Purpose : Main module controller
    // Returns : New instance
    //
    ModuleHouseProjects = Backbone.View.extend({

      initialize : function ( config_map ) {
        this.subscribeOnInit();
        console.log('moduleHouseProjects initiated');
      },

      subscribeOnInit : function () {

        this.subscribe( {
          subscriber_id : this.id,
          sub_channel   : channel,
          sub_name      : 'moduleGenericRequest',
          callback      : this.onModuleGenericRequest
        } );

      },


        onModuleGenericRequest : function ( data ) {

          var is_active ;

          is_active = stateMap.is_active;

        function debug_info(msg) {
          console.group('onModuleGenericRequest');
          console.info('message             : ', msg);
          console.info('pub/sub data        : ', data);
          console.log( 'requested_module_id : ', data.pub_data.requested_module_id);
          console.log( 'pud_data            : ', data.pub_data);
          console.log( 'stateMap            : ', stateMap);
          console.groupEnd();
        }

        if ( data.pub_data.requested_module_id === configMap.id ) {

          debug_info('moduleGenericRequest captured');

          if ( ! is_active ) { this.activate(); }

        }
      },

      // Begin method /activate/
      //
      // Example : module.activate()
      // Purpose   : Activate module dependencies
      // Arguments : none
      // Action    :
      //   * return module state map or false
      // Return    : none
      // Throws    : none
      //
      activate : function () {
        stateMap.subs.mainView = new MainView();
      }
      // End Method /activate/

    });
    // End Constructor /ModuleHouseProjects/

    // ---------------------- END MODULE CONSTRUCTORS -----------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin Public method /config/
    //
    // Example   : moduleHouseProjects.config()
    // Purpose   : Configure the module prior to initialization
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
    // End Public method /config/

    // Begin Public method /init/
    //
    // Example   : moduleHouseProjects.init( $('#div_id) )
    // Purpose   : Direct module to offer its capability to the user
    // Arguments : none
    // Action    :
    //   Append the module elem to the provided container and fill
    //   it with HTML content. Then initialize elements,
    //   events, and handlers to provide the user with a module
    //   interface
    // Returns   : none
    // Throws    : none
    //
    init = function ( html_container ) {
      if ( html_container ) { stateMap.$container = html_container; }
      new ModuleHouseProjects( configMap );
    };
    // End Public method /init/

    // ------------------------- END PUBLIC METHODS -------------------------

    // return public methods
    return {
      config : config,
      init   : init
    };
  }
);