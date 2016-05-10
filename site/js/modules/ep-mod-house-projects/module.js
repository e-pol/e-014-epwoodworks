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
 define
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'site.channel'
  ], function( $, _, Backbone, channel ) {
  "use strict";

    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {
        id : 'EP_MOD_HOUSE_PROJECTS'
      },
      stateMap = {
        $container : null
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

        //
        // Event : requestProjectsRoute
        //
        this.subscribe({
          subscriber_id : this.id,
          sub_channel   : channel,
          sub_name      : 'requestModuleInit',
          callback      : this.onRequestModuleInit
        });


      },

      onRequestModuleInit : function ( data ) {
        if ( data.pub_data.requested_module_id === configMap.id ) {
          console.log( data );
        }
      }

    });
    // End Constructor /ModuleHouseProjects/

    // ---------------------- END MODULE CONSTRUCTORS -----------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin public method /config/
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
    // Purpose   : Directs module to offer its capability to the user
    // Arguments : none
    // Action    :
    //   Appends the module elem to the provided container and fills
    //   it with HTML content. It then initializes elements,
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