/**
 * site.js
 * Main client side javascript file
 * Created by 123 on 10.05.2016.
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
  'backbone'
  ], function ( $, _, Backbone ) {
  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

   var extendBackbone, subscribe, publish, config;

  // --------------------- END MODULE SCOPE VARIABLES ---------------------


  // --------------------- BEGIN BACKBONE METHODS -------------------------

  // Begin Backbone method /extendBackbone/
  //
  // Example   : extendBackbone( {...} )
  // Purpose   :
  //   Extend Backbone components (vies, model e.t.c.)
  //   with custom inheritable methods
  // Arguments :
  //   * method_list
  //     ** backbone_component_list
  // Action    :
  //   * extend Backbone prototypes with custom methods
  // Return    : none
  // Throws    : none
  //
  extendBackbone = function ( method_list ) {
    var method, comp_list, str;
    for ( method in method_list ) {
      if ( method_list.hasOwnProperty( method ) ) {

        // Get components list array
        // Example : [ 'view', 'model ]
        comp_list = method_list [ method ].component_list;

        // Iterate components list array
        comp_list.forEach( function ( comp_name ) {

          // Capitalize the first letter of a Backbone component name
          // given in the component_list array
          // Example : view -> View
          //
          str = comp_name;
          str = str.split('');
          str[0] = str[0].toUpperCase();
          comp_name = str.join('');

          // Extend Backbone prototype with the method if its name is not used
          if ( ! Backbone[ comp_name ].prototype.hasOwnProperty( method ) ) {
            Backbone[ comp_name ].prototype[ method ] = method_list[ method ].ref;
          }
        });
      }
    }
  };
  // End Backbone method /extendBackbone/

  // ---------------------- END BACKBONE METHODS -------------------------


  // -------------------- BEGIN INHERITABLE METHODS ----------------------

  // Begin Inheritable method /subscribe/
  //
  // Example   : siteShell.subscribe( {...} )
  // Purpose   : Subscribe to object for event
  // Arguments :
  //   * sub_map - subscription data
  //     ** subscriber_id
  //     ** sub_channel   - subscription channel (reference to channel object)
  //     ** sub_name      - subscription name (same as publication name)
  //     ** callback      - invoke on publish with pub_data as argument
  // Action    :
  //   * set event listener with callback
  // Return    : none
  // Throws    : none
  //
  subscribe = function ( sub_map ) {
    var sub_channel, sub_name, callback;

    sub_channel = sub_map.sub_channel,
    sub_name    = sub_map.sub_name,
    callback    = sub_map.callback;

    this.listenTo( sub_channel, sub_name, callback );
  };
  // End Inheritable method /subscribe/

  // Begin Inheritable method /publish/
  //
  // Example   : siteShell.publish( {...} )
  // Purpose   : Make publication
  // Arguments :
  //   * pub_map     - publication map
  //     ** publisher_id
  //     ** pub_channel  - publication channel (reference to channel object)
  //     ** pub_name     - publication name
  //     ** pub_data     - publication data
  // Return    : none
  // Throws    : none
  //
  publish = function ( pub_map ) {
    var publisher_id, pub_channel, pub_name, pub_data;

    publisher_id = pub_map.publisher_id,
    pub_channel  = pub_map.pub_channel,
    pub_name     = pub_map.pub_name,
    pub_data     = pub_map;

    if (true) {
      console.group('inheritable method : publish');
      console.log('publisher_id    : ' , publisher_id);
      console.log('pub_channel.id  : ' , pub_channel.id);
      console.log('pub_name        : ' , pub_name);
      console.log('pub_data        : ' , pub_data);
      console.groupEnd();
    }

    pub_channel.trigger( pub_name, pub_data );
  };
  // End Inheritable method /publish/

  // -------------------- END INHERITABLE METHODS -------------------------


  //---------------------- BEGIN PUBLIC METHODS ---------------------------

  // Begin Public method /config/
  //
  // Example   : siteCore.config()
  // Purpose   : Configure site core
  // Arguments : none
  // Action    :
  //   * Extend Backbone (add inherited methods)
  // Returns   : none
  // Throws    : none
  config = function () {
    extendBackbone({
      subscribe : {
        component_list : ['view', 'model', 'collection', 'router'],
        ref            : subscribe
      },
      publish   : {
        component_list : ['view', 'model', 'collection', 'router'],
        ref            : publish
      }
    });
  };
  // End Public method /config/

  // ------------------------- END PUBLIC METHODS -------------------------

  // return public methods
  return { config : config };

});
