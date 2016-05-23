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
//   * createFilters( <filters_map> ) - create filters from a map (JSON)
//   * createFilter( <filter_map> ) - create filter Backbone model
//   * setFilters( <filters_map> ) - set and update filters states
//     from a map (JSON)
//   * setFilter( <filter_map> ) - set and update filter model
//   * getFiltersState() - return filters state map as JSON to client
//   * getFilterState() - create filter model state map as JSON
//   * stringifyFiltersState() - converts filters state JSON to string
//   * parseFiltersState() - parses filters state JSON from string

define([
  'backbone',
  'epModHP/models/filter.model'
  ], function (Backbone, FilterModel) {

  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var
    configMap = {},

    FiltersCollection, getConstructor, config;

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
    }
    // End Constructor method /createFilter/

  });

  // -------------------- END COLLECTION CONSTRUCTOR ----------------------


  return FiltersCollection;

});