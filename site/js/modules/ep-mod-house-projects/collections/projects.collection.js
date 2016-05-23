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
// Private methods:
//   * initialize()
//   * addProjectModels()
//   * addProjectBriefModel()
//   * changeOrderByKey()
//   * setFilters()
//   * setSimpleFilter()
//   * applyFilters()
//   * applySimpleFilter()
//   * applyMinMaxFilter()
//   * resetFilters()
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
      },
      filter_list : null
    },

    ProjectBriefCollection;

  // ------------------- END MODULE SCOPE VARIABLES -----------------------


  // ------------------ BEGIN COLLECTION CONSTRUCTOR ----------------------

  ProjectBriefCollection = Backbone.Collection.extend({
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

      if ( true ) {
        this.changeOrderByKey( 'code', 'desc' );
      }

      stateMap.cache.original_collection
        = new Backbone.Collection( this.models );

      stateMap.cache.filtered_collection
        = new Backbone.Collection();

      stateMap.cache.filter_temp_collection
        = new Backbone.Collection();

      this.setFilters({
        simple : {
          floors : {
            key    : 'floors',
            values : [1, 2]
          },
          tech : {
            key    : 'tech',
            values : [ 'laften' ]
          }
        }
      });

      this.applyFilters();

      new FiltersCollection( null, filter_list );

    },
    // End Constructor method /initialize/

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
    },
    // End Constructor method /changeOrderByKey/

    // Begin Constructor method /setFilters/
    //
    // Example   : this.setFilters( { ...filters map.. })
    // Purpose   : set collection filters
    // Arguments :
    //   * filters_map
    // Action    :
    //   * validate filter type names
    //   * iterate filters list by type
    //   * switch to given filter type
    //     ** get values from filter map
    //     ** invoke filter type relevant method
    // Return    : none
    // Throw     : Error on invalid filter type
    //
    setFilters : function ( filters_map ) {
      var filter_type, filter;

      for ( filter_type in filters_map ) {
        if ( filters_map.hasOwnProperty( filter_type ) ) {
          if ( configMap.allowed_filter_type_list.indexOf( filter_type ) < 0 ) {
            throw new Error( 'Unallowed filter type. Check configMap' );
          }
          switch ( filter_type ) {
            case 'simple':
              for (filter in filters_map[ filter_type ] ) {
                var filter_map, filter_name, key_name, values;
                filter_map  = filters_map[ filter_type ][ filter ];
                filter_name = filter;
                key_name    = filter_map.key;
                values      = filter_map.values;
                this.setSimpleFilter( filter_name, key_name, values );
              }
              break;
          }
        }
      }

    },
    // End Constructor method /setFilters/

    // Begin Constructor method /setSimpleFilter/
    //
    // Example   : this.setSimpleFilter( 'filter_name', 'key', '1' )
    // Purpose   : add simple filter data to stateMap
    // Arguments :
    //   * filter_name - filer name in stateMap
    //   * key         - name of a key of the model
    //   * value       - key value or values
    // Action     :
    //   * if filter_list is empty (null), create it (empty object)
    //   * if simple filters list is empty, create it
    //   * cache simple filters list
    //   * if filter is not in list yet, create it
    //   * if filter is in list
    //     ** and given value type is not array update it
    //     ** and given value type is array iterate it and update filter
    // Return     :
    //   * false - if no action was committed
    //   * true  - if filter was created or updated
    // Throws     : Error on invalid key name
    //
    setSimpleFilter : function ( filter_name, key, value ) {
      var filter, values, simple_filters, rev_value;

      if ( configMap.allowed_filter_key_list.indexOf( key ) < 0 ) {
        throw new Error('Unallowed filter key name. Check configMap. ');
      }

      if ( ! stateMap.filter_list ) {
        stateMap.filter_list = {};
      }

      if ( ! stateMap.filter_list.simple ) {
        stateMap.filter_list.simple = {};
      }

      simple_filters = stateMap.filter_list.simple;

      if ( ! simple_filters[ filter_name ] ) {
        rev_value = Array.isArray( value ) ? value : [ value ];
        simple_filters[ filter_name ] = {
          key    : key,
          values : rev_value
        };
        return true;
      }

      if ( simple_filters[ filter_name ].key === key ){
        if ( ! Array.isArray( value )
          && simple_filters[ filter_name ].values.indexOf( value ) < 0 ){
          simple_filters[ filter_name ].values.push( value );
        }
        else if ( Array.isArray( value ) ) {
          value.forEach( function ( val ) {
            if ( simple_filters[ filter_name ].values.indexOf( val ) < 0 ) {
              simple_filters[ filter_name ].values.push( val );
            }
          } );
        }
        return true;
      }

      return false;

    },
    // End Constructor method /setSimpleFilter/

    // Begin Constructor method /applyFilters/
    //
    // Example   : this.applyFilters()
    // Purpose   : filter collection
    // Arguments : none
    // Action    :
    //   *
    // Return    :
    //   *
    // Throw     :
    //
    applyFilters : function() {
      var
        filter_list, filter, self;

      self                = this;
      filter_list         = stateMap.filter_list;

      // Reset filtered collection to contain all the models
      stateMap.cache.filtered_collection.
        reset( stateMap.cache.original_collection.models );

      if ( ! filter_list ) { return; }

      if ( filter_list[ 'simple' ] ) {
        for ( filter in filter_list[ 'simple' ]) {
          if ( filter_list[ 'simple' ].hasOwnProperty( filter ) ) {
            this.applySimpleFilter( filter_list[ 'simple' ][ filter ] );
          }
        }
      }

      this.reset( stateMap.cache.filtered_collection.models );
    },
    // End Constructor method /applyFilters/

    // Begin Constructor method /applySimpleFilter/
    //
    // Example   : this.applySimpleFilter( {...} )
    // Purpose   :
    // Arguments :
    //   * filter - filter data (obj)
    //     ** key    - model key name
    //     ** values - list (array) of allowed key values
    // Action    :
    //   * get key and values from filter data obj
    //   * iterate values list
    //   *
    // Return    :
    // Throw     :
    //
    applySimpleFilter: function ( filter ) {
      var key, values, model_list;
      key    = filter.key;
      values = filter.values;

      stateMap.cache.filter_temp_collection.reset( null );

      values.forEach( function( value ) {
        var attr = {};
        attr[ key ] = value;

        stateMap.cache.filter_temp_collection
          .add( stateMap.cache.filtered_collection.where( attr ) );

        }, this );

      stateMap.cache.filtered_collection
        .reset( stateMap.cache.filter_temp_collection.models );

    },
    // End Constructor method /applySimpleFilter/

    // Begin Constructor method /resetFilters/
    //
    // Example   : this.resetFilters()
    // Purpose   : reset filters states and all collections
    // Arguments : none
    // Action    :
    //   * reset filters stateMap
    //   * reset collection with filtered models
    //   * reset temporary filter collection
    //   * reset this collection to original state (all models are in)
    // Return    : none
    // Throw     : none
    //
    resetFilters : function() {
      stateMap.filter_list = null;
      stateMap.cache.filtered_collection.reset();
      stateMap.cache.filter_temp_collection.reset();
      this.reset( stateMap.cache.original_collection.models );
    }
    // End Constructor method /resetFilters/
    
  });

  // -------------------- END COLLECTION CONSTRUCTOR ----------------------

  // Return constructor
  return ProjectBriefCollection;

});