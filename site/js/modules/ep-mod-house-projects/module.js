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

// The module agent API
// -----------------
//
// The module agent is available at requireJS path:
// 'modules/ep-mod-house-projects/module'.
//
// The agent provides public module methods
//
// Its Public methods include:
//   * init() - instantiate new module agent. If module agent has
//   been initiated previously it does nothing and return false
//   * config() - set module adjustments
//

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
  ], function( $, _, Backbone, globalChannel, mainView ) {
  "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        mod_id : 'EP_MOD_HOUSE_PROJECTS',
        module : {
          $container : $('ep-mod-house-projects'),
          do_init    : false,
          do_start   : false,
          main       : mainView
        }
      },
      stateMap = {
        $container   : null,
        is_initiated : false,
        is_active    : false,
        mod_agent    : null,
        module       : null,
        module_state_map : {
          is_initiated : false,
          is_active    : false
        }
      },
      EPModHouseProjectsAgent, config, init;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    // Begin Constructor /EPModHouseProjectsAgent/
    //
    // Purpose : Module agent
    // Returns : New instance
    //
    EPModHouseProjectsAgent = Backbone.View.extend({

      initialize : function ( init_data ) {
        var init_data = init_data || configMap;

        this.subscribeOnInit();
        this.id = init_data.mod_id;

        if ( configMap.module.do_init ) {
          this.initModule();
        }

        if ( configMap.module.do_start ) {
          this.startModule();
        }

        console.log('(epModHouseProjects) agent initiated');
      },

      subscribeOnInit : function () {

        this.subscribe( {
          subscriber_id : this.id,
          sub_channel   : globalChannel,
          sub_name      : 'ep-mod-start-request',
          callback      : function ( data ) {
            if ( data.pub_data.requested_module_id === this.id ) {
              this.startModule( data.pub_data.data );
            }
          }

        } );

        this.subscribe( {
          subscriber_id : this.id,
          sub_channel   : globalChannel,
          sub_name      : 'ep-mod-update-request',
          callback      : function ( data ) {
            if ( data.pub_data.requested_module_id === this.id ) {
              this.updateModule( data.pub_data.data );
            }
          }
        } );

        this.subscribe( {
          subscriber_id : this.id,
          sub_channel   : globalChannel,
          sub_name      : 'ep-mod-stop-request',
          callback      : function ( data ) {
            if ( data.pub_data.requested_module_id === this.id ) {
              this.stopModule( data.pub_data.data );
            }
          }
        } );

      },

      configModule : function ( config_map ) {

      },

      initModule : function ( init_data ) {

      },

      startModule : function ( data ) {
        console.info( 'startModule' );
      },

      stopModule : function ( data ) {
        console.log( 'stopModule' );
      },

      updateModule : function ( data ) {
        console.log( 'updateModule' );
      },

      requestService : function ( data ) {

      },


        onModuleGenericRequest : function ( data ) {

        function debug_info(msg) {
          console.group('onModuleGenericRequest');
          console.info('message             : ', msg);
          console.info('pub/sub data        : ', data);
          console.log( 'requested_module_id : ', data.pub_data.requested_module_id);
          console.log( 'pud_data            : ', data.pub_data);
          console.log( 'stateMap            : ', stateMap);
          console.groupEnd();
        }

        if ( data.pub_data.requested_module_id === this.id ) {

          debug_info('moduleGenericRequest captured');

          this.startModController( data.pub_data );

        }
      }

    });
    // End Constructor /EPModHouseProjectsAgent/

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
    config = function ( config_data ) {

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
    init = function ( init_data ) {
      if ( ! stateMap.is_initiated ) {
        stateMap.mod_agent = new EPModHouseProjectsAgent();
        return true;
      }
      return false;
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