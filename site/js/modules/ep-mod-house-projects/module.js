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
        mod_id                    : 'EP_MOD_HOUSE_PROJECTS',
        html_container_default_id : 'ep-mod-house-projects',
        inner                     : {
          do_init           : false,
          do_use_mod_router : false,
          main_ref          : mainView,
          $container        : {
            id    : 'ep-mod-house-projects-inner',
            class : 'ep-mod-house-projects'
          }
        }
      },

      stateMap = {
        $container   : null,
        is_initiated : false,
        inner        : {
          is_initiated : false,
          main         : null,
          $container   : null
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
        this.subscribeOnInit();

        this.id = configMap.mod_id;

        if (init_data && init_data.hasOwnProperty( '$container' )) {
          stateMap.$container = init_data.$container;
        }
        else {
          stateMap.$container = $( configMap.html_container_default_id );
        }

        if ( configMap.inner.do_init ) {
          this.initModule();
        }

        console.log('(ep-mod-hp) agent initiated');
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
        if ( ! stateMap.inner.is_initiated ) {
          stateMap.inner.is_initiated = true;
          this.setInnerContainer();
          configMap.inner.main_ref.init( {
            $container : stateMap.inner.$container
          } );
        }
      },

      // Begin Method /startModule/
      //
      // Example   : module.start( {...} )
      // Purpose   :
      // Arguments :
      //   * data -
      // Action    :
      //   * if module not initiated init it
      //   * show module html
      // Return    : none
      // Throw     : none
      //
      startModule : function ( data ) {

        console.log( '(ep-mod-hp) startModule' );

        if ( ! stateMap.inner.is_initiated ) {
          this.initModule();
        }
        stateMap.inner.$container.show();
      },
      // End Method /startModule/

      stopModule : function ( data ) {

        console.log( '(ep-mod-hp) stopModule' );

        stateMap.inner.$container.hide();
      },

      updateModule : function ( data ) {

        console.log( '(ep-mod-hp) updateModule' );

      },

      requestService : function ( data ) {

      },

      // Begin Constructor method /setInnerContainer/
      //
      // Example   : module.setInnerContainer()
      // Purpose   : creates module inner html container
      // Arguments : none
      // Action    :
      //   * check if inner container was not created previously
      //   * get elem id and class from configMap
      //   * create new <div> elem with jQuery with proposed id and class
      //   * update stateMap (set reference to elem)
      //   * append elem to module outer container
      //   * return elem
      // Return    :
      //  * jQuery object with created element
      //  * false - if elem was created before
      // Throws    : none
      //
      setInnerContainer : function () {
        if ( ! stateMap.inner.$container ) {
          var $el, $el_id, $el_class;

          $el_id = configMap.inner.$container.id;
          $el_class = configMap.inner.$container.class;

          $el = $('<div>', {
            id    : $el_id,
            class : $el_class
          } ).text('DEBUG MESSAGE: (Module) EP_MOD_HOUSE_PROJECTS');

          stateMap.inner.$container = $el;
          $(stateMap.$container).append( $el );

          return $el;
        }
        return false;
      }
      // End Constructor method /setInnerContainer/
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
        new EPModHouseProjectsAgent( init_data );
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