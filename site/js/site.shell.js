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
        "id" : "EP_SITE_SHELL",
        "subscription_list" : {}
      },

      stateMap = {
        active_module : null,
        modules : {
          _state_map_template_ : {
            is_active : false,
            data      : {}
          }
        }
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
          moduleHouseProjects.init();
          router.init();
          router.start();
          console.log( 'siteShell initiated' );
        },

        subscribeOnInit: function () {

          //
          // Event : moduleInitiated
          //

          //
          // Event : moduleActivated
          //

          //
          // Event : requestProjectsRoute
          //
          this.subscribe({
            subscriber_id : this.id,
            sub_channel   : channel,
            sub_name      : 'requestProjectsRoute',
            callback      : this.onRequestProjectsRoute
          });

          //
          // Event : requestDefaultRoute
          //
          this.subscribe({
            subscriber_id : this.id,
            sub_channel   : channel,
            sub_name      : 'requestDefaultRoute',
            callback      : this.onRequestDefaultRoute
          });

        },

        // Begin Event handler /onRequestProjectsRoute/
        //
        // Example : siteShell.onRequestProjectsRoute( /*data*/ )
        // Purpose   : Handle the event
        // Arguments :
        //   * data - pub/sub data
        // Action    :
        //   *
        // Return    : none
        // Throws    : none
        //
        onRequestProjectsRoute : function ( data ) {
          var
            module_id    = 'EP_MOD_HOUSE_PROJECTS',
            module_maps  = stateMap.modules,
            module_state_map, proposed_data;

          // validate pub data
          if (false) {
            return false;
          }

          proposed_data = data.pub_data;

          // If module has no state map, create it
          if ( ! module_maps[ module_id ] ) {
            module_state_map = {};
            $.extend( true, module_state_map, module_maps._state_map_template_ );
            module_maps[ module_id ] = module_state_map;

            module_state_map.data = proposed_data;


            ////////////////////////////////////
            //                                //
            //   Publish : requestModuleInit  //
            //                                //
            ////////////////////////////////////

            this.publish({
              publisher_id : this.id,
              pub_channel  : channel,
              pub_name     : 'requestModuleInit',
              pub_data     : {
                requested_module_id : module_id,
                proposed_data       : module_state_map.data
              }
            });

            debug_info('Created new module state map. Requested Module Init');

            return true;
          }

          // If requested module is active
          if ( module_maps[ module_id ].is_active ) {

            // If data hasn`t been changed return
            if ( module_state_map.data === proposed_data ){
              return false;
            }

            this.publish({
              publisher_id : this.id,
              pub_channel  : channel,
              pub_name     : 'requestModuleStateChange',
              pub_data     : {
                module_id       : module_id,
                module_pub_data : data.pub_data
              }
            });

            debug_info('New data redirected to active module');

            return true;
          }

          function debug_info(msg) {
            console.group('onRequestProjectsRoute');
            console.info('message             : ', msg);
            console.info('pub/sub data        : ', data);
            console.log( 'requested module_id : ', module_id);
            console.log( 'proposed_data       : ', proposed_data);
            console.log( 'module_state_map    : ', module_state_map);
            console.log( 'stateMap            : ', stateMap);
            console.groupEnd();
          }
        },
        // End Event handler /onRequestProjectsRoute/

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