/**
 * Created by 123 on 12.05.2016.
 * filter.collection.js
 *
 */


/**
 * Created by 123 on 12.05.2016.
 * Brief projects collection
 * projects.collection.js
 */

/*jslint
 browser : true,   continue : true,    devel : true,     indent   : 2,
 maxerr  : 50,     newcap   : true,    nomen : true,     plusplus : true,
 regexp  : true,   sloppy   : true,    vars : false,     white    : true
 */

/*global
 define
 */

// The filters collection API
// --------------------------
// The filters collection constructor is available at:
//   * ep-mod-house-projects/collections/filters.collection.js
// The filters collection constructor provides methods and events to manage
// a collection of filters. Each filter is represented by a Backbone model
//
//  Module public methods:
//   * module returns filters collection object constructor
//
// Constructor methods:
//
//   * createFilters( <filters_map> )
//     - create filters from a map for all filters {Object}
//
//   * createFilter( <filter_map> )
//     - create filter Backbone model from a single filter map {Object}
//
//   * setFiltersState( <filters_map> )
//     - set and update filters states from a map for all filters {Object}
//
//   * getFiltersState()
//     - return all filters state map as {Object} to client
//
define([
  'backbone',
  'epModHP/models/filter.model'
  ], function (Backbone, FilterModel) {

  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var FiltersCollection;

  // ------------------- END MODULE SCOPE VARIABLES -----------------------


  // ------------------ BEGIN COLLECTION CONSTRUCTOR ----------------------

  FiltersCollection = Backbone.Collection.extend({
    //
    // Begin Constructor method /initialize/
    //
    // Purpose   : run routines on object init
    // Arguments :
    //   * models {Model/Models} - list of filters as Backbone models or null
    //   * init_data {JSON} - init map containing filters data
    // Action    :
    //   * create filters from init_data JSON if provided
    // Return    : none
    // Throw     : none
    //
    initialize : function( models, init_data ) {
      if ( init_data ) {
        this.createFilters( init_data );
      }
    },
    // End Constructor method /initialize/

    // Begin Constructor method /createFilters/
    //
    // Example   : this.createFilters( { <filters_data> } )
    // Purpose   : create filters from JSON
    // Arguments :
    //   * filters_data {Array} - filters list data
    // Action    :
    //   * iterate filters data array
    //   * for each iteration create new filter model
    //     and add to this filters collection
    // Return    : none
    // Throw     : none
    //
    createFilters : function ( filters_data ) {
      filters_data.forEach( function( filter_data ) {
        this.createFilter( filter_data );
      }, this );
    },
    // End Constructor method /createFilters/

    // Begin Constructor method /createFilters/
    //
    // Example   : this.createFilter( { <filter_data> } )
    // Purpose   : create filter from JSON
    // Arguments :
    //   * filter_data {JSON} - filter data
    //     ** type {String}  - filter type : "simple", "min_max" e.t.c.
    //     ** key {String}   - project model key to filter
    //     ** values {Array} - list of key values allowed for filtering
    // Action    :
    //    * create new filter model (Backbone)
    //    * add the model to this filters collection
    // Return    : none
    // Throw     : none
    //
    createFilter : function ( filter_data ) {
      var filterModel = new FilterModel( filter_data );
      this.add( filterModel );
    },
    // End Constructor method /createFilter/

    // Begin Constructor method /setFiltersState/
    //
    // Example   : this.setFiltersState( { <filters_state_map> } )
    // Purpose   : set filters state
    // Arguments : {Object}
    // Action    :
    //    *
    // Return    : none
    // Throw     : none
    //
    setFiltersState : function ( filters_state_map ) {
      var
        filter_state_map, filter_type, filter_type_regex,
        filter_key, filter_key_regex;

      for ( filter_state_map in filters_state_map ) {
        if ( filters_state_map.hasOwnProperty( filter_state_map ) ) {

          filter_key_regex  = /\w*/;
          filter_key        = filter_state_map.match( filter_key_regex )[0];
          filter_type_regex = /--(\w*)/;
          filter_type       = filter_state_map.match( filter_type_regex )[1];

          this.each( function ( filter_model ) {
            if ( filter_model.get( 'key' ) === filter_key
              && filter_model.get( 'filter_type' ) === filter_type) {

              filter_model.setFilterState( {
                filter_type : filter_type,
                key         : filter_key,
                values      : filters_state_map[ filter_state_map ]
              } );
            }
          } )

        }
      }

      this.trigger( 'filtersStateChange', this.getFiltersState() );
    },
    // End Constructor method /setFiltersState/

    // Begin Constructor method /getFiltersState/
    //
    // Example   : this.getFiltersState()
    // Purpose   : get filters state map as object
    // Arguments : none
    // Action    :
    //    * get filter state props from filter state map
    //    * add them to empty object
    //    * add filter state object to filters state map
    //    * return filters state map
    // Return    : {Object} Filters state map
    // Throw     : none
    //
    getFiltersState : function () {
      var
        filters_state = {},
        key, values, filter_type, filter_id, filter_state_map;

      this.each( function( filter_model ) {
        filter_state_map = filter_model.getFilterState();
        key         = filter_state_map.key;
        filter_type = filter_state_map.filter_type;
        values      = filter_state_map.values;
        filter_id   = key + '--' + filter_type;

        if ( values.length > 0 ) {
          filters_state[ filter_id ] = values;
        }
      } );
      return { filter_state_list : filters_state };
    }
    // End Constructor method /getFiltersState/

  });

  // -------------------- END COLLECTION CONSTRUCTOR ----------------------


  return FiltersCollection;

});