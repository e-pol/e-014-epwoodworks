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
 window, define
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'channel',
  'shell/site.shell.router',
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
        active_module_id  : null,
        default_module_id : 'EP_MOD_LANDING_PAGE',
        modules : {
          _state_map_tmpl_ : {
            is_active  : false,
            hash       : null,
            route_data : {}
          }
        }
      },

      SiteShell, init;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // --------------------- BEGIN MODULE UTILITIES -------------------------
    // ----------------------- END MODULE UTILITIES -------------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    // Begin Constructor /SiteShell/
    //
    // Example   : new SiteShell()
    // Purpose   : Create main site controller
    // Arguments : none
    // Action    :
    //   *
    // Returns   : site shell object
    // Throws    : none
    //
      SiteShell = Backbone.View.extend( {

        initialize: function () {
          this.id = configMap.id;

          this.subscribeOnInit();
          moduleHouseProjects.init();
          router.init();
          router.start();
          console.log( 'siteShell initiated' );
        },

        // Begin Method /subscribeOnInit/
        //
        // Example   : siteRouter.subscribeOnInit();
        // Purpose   : does all subscriptions on init
        // Arguments : none
        // Action    :
        //   * do all subscriptions
        // Return    : none
        // Throws    : none
        //
        subscribeOnInit: function () {
          this.subscribe({
            subscriber_id : this.id,
            sub_channel   : channel,
            sub_name      : 'moduleRouteRequest',
            callback      : this.manageModuleStates
          });
        },
        // End Method /subscribeOnInit/

        // Begin Method /getModuleStateMap/
        //
        // Example   : siteShell.getModuleStateMap( 'module_id' )
        // Purpose   : Return module state map
        // Arguments :
        //   * module_id - string
        // Action    :
        //   * return module state map or false
        // Return    :
        //   * module state map - if exist
        //   * false            - if cannot get
        // Throws    : none
        //
        getModuleStateMap : function ( module_id ) {
          if ( stateMap.modules[ module_id ] ) {
            return stateMap.modules[ module_id ];
          }
          return false;
        },
        // End Method /getModuleStateMap/

        // Begin Method /setModuleStateRoute/
        //
        // Example   : siteShell.setModuleStateRoute( 'module_id', {...} )
        // Purpose   : Set module route in stateMap
        // Arguments :
        //   * module_id
        //   * proposed_route_data - proposed route data
        //   * do_override         - force to override route data
        // Action    :
        //   * set new module map if needed and return it
        //   * check if route was changed and return false
        //   if override is not set true
        //   * update route and return module state map
        // Return    :
        //   *
        // Throws    : none
        //
        setModuleStateRoute : function ( module_id, proposed_route_data, do_override ) {
          var module_state_map = stateMap.modules[ module_id ];

          // create, populate, store and return new module state map
          if ( ! module_state_map ) {
            module_state_map = {};
            $.extend( true, module_state_map, stateMap.modules._state_map_tmpl_);
            module_state_map.route_data = proposed_route_data;
            stateMap.modules[ module_id ] = module_state_map;
            return module_state_map;
          }

          // Return false if route data was not changed and override not set
          if ( module_state_map.route_data === proposed_route_data
            && ! do_override ) {
            return false;
          }

          // Update route data
          module_state_map.route_data = proposed_route_data;
          return module_state_map;
        },
        // End Method /setModuleStateRoute/

        // Begin Method /setModuleStateActive/
        //
        // Example   : siteShell.setModuleStateActive( 'module_id );
        // Purpose   : Set module active
        // Arguments :
        //   * module_id
        // Action    :
        //   * set previous module inactive
        //   * set requested module active and return its map
        // Return    :
        //   * module_state_map
        //   * true             - if module is active
        //   * false            - if module state map is not on list
        // Throw     : none
        //
        setModuleStateActive : function ( module_id ) {
          var
            module_state_map      = this.getModuleStateMap( module_id ),
            prev_active_module_id = stateMap.active_module_id;

          if ( module_state_map ) {
            if ( module_state_map.is_active ) { return true; }

            // set previous module inactive
            if ( prev_active_module_id !== null
              && prev_active_module_id !== module_id) {
              this.getModuleStateMap( prev_active_module_id ).is_active = false;
            }

            // set requested module active
            module_state_map.is_active = true;
            stateMap.active_module_id = module_id;
            return module_state_map;
          }
          return false;
        },
        // End Method /setModuleStateActive/

        // Begin Method /manageModuleStates/
        //
        // Example   : siteShell.manageModuleStates( {...} )
        // Purpose   : manage site states
        // Arguments :
        //   * data - publication data
        // Action    :
        //   * restore to previous route if unallowed url
        //   * activate default module if needed
        //   * do nothing if active module requested with no route change
        //   * update module state map
        //   * activate requested module
        // Return    : none
        // Throws    : none
        //
        manageModuleStates : function ( data ) {
          var
            module_state_map, prev_state_map, prev_route_data,
            requested_module_id, proposed_route_data,
            prev_active_module_id, active_module_id,
            hash;


          // ----------------- BEGIN DEBUG FUNCTIONS -----------------------

          function debug_info(msg) {

            return;

            console.group('onRequestRoute');
            console.info('message              : ', msg);
            console.info('pub/sub data         : ', data);
            console.log( 'modules_state_map    : ', module_state_map);
            console.log( 'requested_module_id  : ', requested_module_id);
            console.log( 'proposed_route_data  : ', proposed_route_data);
            console.log( 'prev_route_data      : ', prev_route_data);
            console.log( 'prev_state_map       : ', prev_state_map);
            console.log( 'stateMap             : ', stateMap);
            console.groupEnd();
          }

          // -------------------- END DEBUG FUNCTIONS ---------------------


          requested_module_id   = data.pub_data.requested_module_id;
          proposed_route_data   = data.pub_data.route_data;
          prev_state_map        = this.getModuleStateMap( requested_module_id );
          prev_route_data       = prev_state_map.route_data;
          prev_active_module_id = stateMap.active_module_id;
          hash                  = window.location.hash.substr(1);

          debug_info('Start');

          //////////////////////////////////////////////////
          //                                              //
          //      >>>>>   !!!   NEED   !!!   <<<<<        //
          //                                              //
          //           prevent incorrect states           //
          //           from getting to history            //
          //                                              //
          //////////////////////////////////////////////////


          if ( requested_module_id === null && prev_active_module_id ) {
            // restore previous route
            //window.location.hash = stateMap.modules[ prev_active_module_id ].hash;
            return false;
          }

          // if requested module is not defined get default settings
          if ( requested_module_id === null ) {
            requested_module_id = stateMap.default_module_id;
            proposed_route_data = null;
          }

          // if requested active module and route was not changed return false
          if ( prev_active_module_id === requested_module_id
            && prev_route_data === proposed_route_data ) {
            return false;
          }

          module_state_map = this
            .setModuleStateRoute( requested_module_id, proposed_route_data );
          module_state_map.hash = hash;

          debug_info('Point 1');

          if ( ! module_state_map.is_active ) {
            module_state_map = this.setModuleStateActive( requested_module_id );
          }

          active_module_id = stateMap.active_module_id;

          debug_info('Point 2');

          this.activateModule({
            requested_module_id   : active_module_id,
            prev_active_module_id : prev_active_module_id,
            proposed_route_data   : stateMap.modules[ active_module_id ]
          });

          debug_info('End');
        },
        // End Method /manageModuleStates/

        // Begin Method /activateModule/
        // Example : siteShell.activateModule( {...} )
        // Purpose   : Activate or change requested module
        // Arguments :
        //   * data - publication data
        // Action    :
        //   * deactivate previous module if needed
        //   * activate requested module
        // Return    : none
        // Throws    : none
        //
        activateModule : function ( data ) {
          var
            requested_module_id   = data.requested_module_id,
            prev_active_module_id = data.prev_active_module_id,
            proposed_route_data   = data.proposed_route_data;

          if ( prev_active_module_id !== null
            && prev_active_module_id !== requested_module_id  ) {
            this.publish({
              publisher_id : this.id,
              pub_channel  : channel,
              pub_name     : 'moduleDeactivateRequest',
              pub_data     : {
                requested_module_id : prev_active_module_id
              }
            });
          }

          //////////////////////////////////////////////////
          //                                              //
          //      >>>>>   !!!   NEED   !!!   <<<<<        //
          //                                              //
          //  publish  after the first request succeeded  //
          //                                              //
          //////////////////////////////////////////////////

          this.publish({
            publisher_id : this.id,
            pub_channel  : channel,
            pub_name     : 'moduleGenericRequest',
            pub_data     : {
              requested_module_id : requested_module_id,
              proposed_route_data : proposed_route_data
            }
          });
        }
        // End Method /activateModule/
      });

    // End Constructor /SiteShell/

    // ---------------------- END MODULE CONSTRUCTORS -----------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin Public method /init/
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
    // End Public method /init/

    // ------------------------- END PUBLIC METHODS -------------------------

    // return public methods
    return { init : init };
  }
);