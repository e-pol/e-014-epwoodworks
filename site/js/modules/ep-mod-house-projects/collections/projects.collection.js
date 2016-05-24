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

// Module API
//
// Purpose : define collection constructor
//
// Constructor methods:
//
//
// Public methods:
//   * return Collection constructor
//

define([
  'jquery',
  'underscore',
  'backbone',
  'epModHP/models/project_brief.model',
  'epModHP/collections/filters.collection'
  ], function ( $, _, Backbone, ProjectBriefModel, FiltersCollection ) {
  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var
    configMap = {
      id : 'EP_MOD_HOUSE_PROJECTS_PROJECTS_COLLECTION',
      allowed_filter_type_list : [
        'simple', 'min_max'
      ],
      allowed_filter_key_list  : [
        'area' , 'type' , 'floors' , 'tech'
      ]
    },

    stateMap = {
      cache : {
        original_collection    : null,
        filtered_collection    : null,
        filter_temp_collection : null
      }
    },

    ProjectBriefCollection;

  // ------------------- END MODULE SCOPE VARIABLES -----------------------


  // ------------------ BEGIN COLLECTION CONSTRUCTOR ----------------------

  ProjectBriefCollection = Backbone.Collection.extend({

    original_collection    : null,
    filters_collection     : null,
    filtered_collection    : null,
    filter_temp_collection : null,

    //
    // Begin Constructor method /initialize/
    //
    // Purpose   : invoked on initialization
    // Arguments :
    //   * init_data - configuration data
    // Action    :
    //   * set collection id
    //   * add project models to collection
    // Return    : none
    // Throws    : none
    //
    initialize : function ( models, model_data ) {
      var project_list, filter_list;

      this.id = configMap.id;

      project_list = model_data.project_list;
      filter_list  = model_data.filter_list;

      console.log( '(ep-mod-hp) ' + this.id + ' initiated' );

      this.addProjectModels( project_list );
      this.filters_collection = new FiltersCollection( null, filter_list );

      this.listenTo( this.filters_collection, 'filtersStateChange',
        this.onFilterStateChange );

      this.original_collection = new Backbone.Collection( this.models );
      this.filtered_collection = new Backbone.Collection();
      this.filter_temp_collection = new Backbone.Collection();


      // ---------------------- BEGIN FAKE ----------------------------------

      this.filters_collection.setFiltersState({
        "area--min_max" : [ 50, 200 ],
        "tech--simple"  : [ 'profiled-beam' ]
      });

      console.log( this.filtered_collection.models );

      // ----------------------- END FAKE ----------------------------------


      if ( true ) {
        this.changeOrderByKey( 'code', 'desc' );
      }

    },
    // End Constructor method /initialize/

    onFilterStateChange : function ( filters_state_map ) {
      this.getFilteredCollection( filters_state_map.filter_state_list );
    },

    getFilteredCollection : function ( filters ) {
      var
        filter, filter_id, key, values, key_regex,
        filter_type, filter_type_regex, filtered_collection;

      this.filtered_collection.reset( this.original_collection.models );

      for (filter in filters ) {
        if ( filters.hasOwnProperty( filter ) ) {
          filter_id         = filter;
          key_regex         = /\w*/;
          key               = filter_id.match( key_regex )[0];
          filter_type_regex = /--(\w*)/;
          filter_type       = filter_id.match( filter_type_regex )[1];
          values            = filters[ filter ];
        }

        switch ( filter_type ) {
          case 'simple':
            this.filterBySimple( this.filtered_collection, {
              key    : key,
              values : values
            } );
            break;

          case 'min_max':
            this.filterByMinMax( this.filtered_collection, {
              key    : key,
              values : values
            } );
            break;
        }
      }

      return this.filtered_collection;
    },

    // Begin Constructor method /filterBySimple/
    //
    // Example   : this.filterBySimple( collection, {<filter>} )
    // Purpose   : apply simple filter to any collection
    // Arguments :
    //   * collection - Backbone collection
    //   * filter - filter map {Object}
    //     ** key - key to filter by
    //     ** values - array with values to include
    // Action    :
    //   * cache temporary collection and filter attributes
    //   * reset temporary collection
    //   * add models that satisfy filter conditions to temporary collection
    //   * reset collection being filtered to obtained models
    //   * return filtered collection
    // Return    : filtered collection
    // Throws    : none
    //
    filterBySimple : function( collection, filter ) {
      var
        temp_collection = this.filter_temp_collection,
        key = filter.key,
        values = filter.values;

      temp_collection.reset();

      values.forEach( function ( value ) {
        var attr = {};
        attr[key] = value;
        temp_collection.add( collection.where( attr ) );
      }, this );

      collection.reset( temp_collection.models );

      return collection;
    },
    // End Constructor method /filterBySimple/

    // Begin Constructor method /filterByMinMax/
    //
    // Example   : this.filterByMinMax( collection, {<filter>} )
    // Purpose   : apply min_max filter to any collection
    // Arguments :
    //   * collection - Backbone collection
    //   * filter - filter map {Object}
    //     ** key - key to filter by
    //     ** values - array with min and max key values
    // Action    :
    //   * cache filter attributes
    //   * get filtered models from collection
    //   * reset collection to filtered models
    //   * return collection
    // Return    : filtered collection
    // Throws    : none
    //
    filterByMinMax : function ( collection, filter ) {
      var
        key             = filter.key,
        min_value       = filter.values[0],
        max_value       = filter.values[1],
        filtered_models;

      filtered_models = collection.filter( function ( project_model ) {
        return ( project_model.get( key ) >= min_value
        && project_model.get( key ) <= max_value);
      }, this );

      collection.reset( filtered_models );

      return collection;
    },
    // End Constructor method /filterByMinMax/

    // Begin Constructor method /addProjectModels/
    //
    // Example   : this.addProjectModels( {...} )
    // Purpose   : populate collection with project models
    // Arguments :
    //   * projects_data - project models data in JSON format
    // Action    :
    //   * iterate projects list
    //   * invoke this.addProjectBriefModel() for every project
    // Return    : none
    // Throws    : none
    //
    addProjectModels : function ( projects_data ) {
      var project;
      for ( project in projects_data ) {
        if ( projects_data.hasOwnProperty( project ) ) {
          this.addProjectBriefModel( projects_data[ project ] );
        }
      }
    },
    // End Constructor method /addProjectModels/

    // Begin Constructor method /addProjectBriefModel/
    //
    // Example   : this.addProjectBriefModel( {...} )
    // Purpose   : populate collection with project models
    // Arguments :
    //   * project_data - project model data in JSON format
    // Action    :
    //   * create new model with constructor
    //   * add model to this collection
    // Return    : none
    // Throws    : none
    //
    addProjectBriefModel : function ( project_data ) {
      var model = new ProjectBriefModel( project_data );
      this.add( model );
    },
    // End Constructor method /addProjectBriefModel/

    // Begin Constructor method /changeOrderByKey/
    //
    // Example   : this.changeOrderByKey( 'key', 'asc' )
    // Purpose   : sort collection by key in asc/desc order
    // Arguments :
    //   * key   - model key
    //   * order - could be 'asc' or 'desc'
    // Action    :
    //   * set collection comparator
    //     ** get model_a and model_b key values
    //     ** set boolean is_asc true/false depending on requested order
    //     ** return -1 / 0 / 1 depending on key values and order
    //   * sort collection with revised comparator
    // Return    : none
    // Throws    : none
    //
    changeOrderByKey : function ( key, order ) {

      this.comparator = function ( model_a, model_b ) {
        var val_a, val_b, is_asc;
        val_a = model_a.get( key );
        val_b = model_b.get( key );

        is_asc = ( order === 'asc' );

        if ( val_a > val_b ) {
          return  is_asc ? 1 : -1 ;
        }
        else if ( val_a < val_b ) {
          return is_asc ? -1 : 1 ;
        }
        else {
          return 0;
        }
      };

      this.sort();
    }
    // End Constructor method /changeOrderByKey/
    
  });

  // -------------------- END COLLECTION CONSTRUCTOR ----------------------

  // Return constructor
  return ProjectBriefCollection;

});