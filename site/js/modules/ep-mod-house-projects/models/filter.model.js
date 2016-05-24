/**
 * Created by 123 on 22.05.2016.
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
// Public methods:
//   * return Filter Model constructor
//
// Model methods:
//   * validateFilterType()    +
//   * validateFilterValues()  +
//
//   * createFilter()          +
//   * createSimple()          +
//   * createMinMax()          +
//
//   * getFilterState()        +
//   * setFilterState()        -
//
//   * getSimpleFilterState()  +
//   * setSimpleFilterState()  -
//
//   * getMinMaxFilterState()  +
//   * setMinMaxFilterState()  -
//
define([
   'backbone'
  ], function ( Backbone ) {
  "use strict";


  // ---------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var
    FilterModel;

  // ------------------ END MODULE SCOPE VARIABLES -----------------------


  // ------------------ BEGIN MODEL CONSTRUCTOR ---------------------------

  FilterModel = Backbone.Model.extend({
    defaults : {
      filter_type : 'simple',
      key         : null,
      values      : []
    },

    valid : {
      filter_type_list : [ 'simple', 'min_max' ]
    },

    initialize : function() {
      this.isValid();
      this.createFilter( this.get( 'filter_type' ) );
    },

    validate : function() {
      this.validateFilterType( this.get( 'filter_type' ) );
      this.validateFilterValues( this.get( 'values' ) );
    },

    // Begin Constructor method /validateFilterType/
    //
    // Example   : this.validateFilterType( this.get( 'type' ) )
    // Purpose   : validate type of filter set as 'type' attribute of this model
    // Arguments : proposed filter type
    // Action    :
    //   * check if type of filter 'type' value is {string}
    //     and type value is allowed
    // Return    :
    //   * true if succeeded
    // Throw     :
    //   * new Error if type is not allowed
    //
    validateFilterType : function( filter_type ) {
      if ( typeof filter_type === 'string'
        && this.valid.filter_type_list.indexOf( filter_type ) >= 0 ) {
        return true;
      }
      throw new Error( 'Invalid filter type : | ' + filter_type + ' | . Allowed types are: | ' + this.valid.types.join(' | ') + ' |');
    },
    // End Constructor method /validateFilterType/

    // Begin Constructor method /validateFilterValues/
    //
    // Example   : this.validateFilterType( this.get( 'values' ) )
    // Purpose   : check if filter values type is array
    // Arguments : proposed filter values
    // Action    :
    //   * check if type of filter values is array
    // Return    :
    //   * true if succeeded
    // Throw     :
    //   * new Error if values type is not array
    //
    validateFilterValues : function( values ) {
      if ( Array.isArray( values )) {
        return true;
      }
      throw new Error( 'Invalid values type : | ' + typeof values + ' | . Must be array' );
    },
    // End Constructor method /validateFilterValues/

    // Begin Constructor method /createFilter/
    //
    // Example   : this.createFilter( 'simple' )
    // Purpose   : create model depending on provided filter type
    // Arguments :
    //   * filter_type {String} - type of a filter ('simple', 'min_max' e.t.c.)
    // Action    :
    //   * invoke method for proper model configuration
    // Return    : none
    // Throw     : none
    //
    createFilter : function ( filter_type ) {
      switch ( filter_type ) {
        case 'simple':
          this.createSimple();
          break;
        case 'min_max':
          this.createMinMax();
          break;
      }
    },
    // End Constructor method /createFilter/

    // Begin Constructor method /createSimple/
    //
    // Example   : this.createSimple()
    // Purpose   : set simple filter`s key values to initial state
    // Arguments : none
    // Action    :
    //   * cache model 'values' attribute, create new empty array for values
    //   * crate map for each value and add it to empty array
    //   * set values to new array
    // Return    : none
    // Throw     : none
    //
    createSimple : function () {
      var
        values = this.get( 'values' ),
        rev_values = [];

      values.forEach( function ( value ) {
        var value_map = {
          value       : value,
          is_selected : false
        };
        rev_values.push( value_map );
      }, this );

      this.set({ values : rev_values });
    },
    // End Constructor method /createSimple/

    // Begin Constructor method /createMinMax/
    //
    // Example   : this.createMinMax()
    // Purpose   : set min_max filter`s key values to initial state
    // Arguments : none
    // Action    :
    //   * cache model 'values' attribute, min and max values,
    //     create revised values obj
    //   * set model 'values' attribute to revised values
    // Return    : none
    // Throw     : none
    //
    createMinMax : function () {
      var
        values = this.get( 'values' ),
        min = values[ 0 ], max = values[ 1 ],
        rev_values = {
          min : min,
          max : max
        };

      this.set({ values : rev_values });
    },
    // End Constructor method /createMinMax/

    // Begin Constructor method /getFilterState/
    //
    // Example   : this.getFilterState()
    // Purpose   : get filter state map in JSON format
    // Arguments : none
    // Action    :
    //   *
    // Throw     : none
    //
    getFilterState : function () {
      switch ( this.get( 'filter_type' ) ) {
        case 'simple':
          return this.getSimpleFilterState();
          break;

        case 'min_max':
          return this.getMinMaxFilterState();
          break;
      }
      return false;
    },
    // End Constructor method /getFilterState/

    // Begin Constructor method /getSimpleFilterState/
    //
    // Example   : this.getSimpleFilterState()
    // Purpose   : get simple filter state in JSON format
    // Arguments : none
    // Action    :
    //   * create empty filter map
    //   * set filter`s props
    //   * add selected values
    //   * return filter map
    // Return    : filter state map in JSON format
    // Throw     : none
    //
    getSimpleFilterState : function () {
      var state_map = {};

      state_map.filter_type = this.get( 'filter_type' );
      state_map.key         = this.get( 'key' );
      state_map.values      = [];

      this.get( 'values' ).forEach( function( value_map ) {
        if ( value_map.is_selected ) {
          state_map.values.push( value_map.value );
        }
      }, this );

      return state_map;
    },
    // End Constructor method /getSimpleFilterState/

    // Begin Constructor method /getMinMaxFilterState/
    //
    // Example   : this.getMinMaxFilterState()
    // Purpose   : get min_max filter state in JSON format
    // Arguments : none
    // Action    :
    //   * create empty filter map
    //   * set filter`s props
    //   * add min and max values to values array
    //   * return filter map
    // Return    : filter state map in JSON format
    // Throw     : none
    //
    getMinMaxFilterState : function () {
      var state_map = {};

      state_map.filter_type = this.get( 'filter_type' );
      state_map.key         = this.get( 'key' );
      state_map.values      = [
        this.get( 'values' ).min,
        this.get( 'values' ).max ];

      return state_map;
    },
    // End Constructor method /getMinMaxFilterState/

    // Begin Constructor method /setFilterState/
    //
    // Example   : this.setFilterState( { <proposed_state_map> } )
    // Purpose   : set filter state from state map
    // Arguments :
    //   * prop_state_map {Object} - proposed filter state map
    // Action    :
    //   * invoke method for proper filter type
    // Return    : none
    // Throw     : none
    //
    setFilterState : function ( state_map ) {
      var filter_type = state_map.filter_type;

      if ( this.get( 'filter_type' ) !== filter_type ) {
        return;
      }
      switch ( filter_type ) {
        case "simple":
          this.setSimpleFilterState( state_map );
          break;

        case "min_max":
          this.setMinMaxFilterState( state_map );
          break;
      }
    },
    // End Constructor method /setFilterState/

    // Begin Constructor method /setSimpleFilterState/
    //
    // Example   : this.setSimpleFilterState( { <proposed_state_map> } )
    // Purpose   : set filter state from state map
    // Arguments :
    //   * prop_state_map {Object} - proposed filter state map
    // Action    :
    //   * get previous and proposed key values to use for filtering
    //   * set proposed values to 'selected' ( is_selected = true )
    //   * set other values to 'not selected' ( is_selected = false )
    // Return    : none
    // Throw     : none
    //
    setSimpleFilterState : function ( prop_state_map ) {
      var prev_values, prop_values;

      prev_values = this.get( 'values' );
      prop_values = prop_state_map.values;

      prop_values.forEach( function ( prop_value ) {
        prev_values.forEach( function ( prev_value_map ) {
          if ( prev_value_map.value ===  prop_value ) {
            prev_value_map.is_selected = true;
          } else {
            prev_value_map.is_selected = false;
          }
        } )
      } );
    },

    // Begin Constructor method /setMinMaxFilterState/
    //
    // Example   : this.setMinMaxFilterState( { <proposed_state_map> } )
    // Purpose   : set filter state from state map
    // Arguments :
    //   * prop_state_map {Object} - proposed filter state map
    // Action    :
    //   * get previous and proposed key values
    //   * compare them
    //   * update previous values if they differ
    // Return    : none
    // Throw     : none
    //
    setMinMaxFilterState : function ( prop_state_map ) {
      var prev_min, prev_max, prop_min, prop_max, rev_values;

      prev_min = this.get( 'values' ).min;
      prev_max = this.get( 'values' ).max;

      prop_min = prop_state_map.values[0];
      prop_max = prop_state_map.values[1];

      if ( prev_min !== prop_max || prev_max !== prop_max ) {

        rev_values = {
          min : prop_min,
          max : prop_max
        };

        this.set({ values : rev_values  });
      }
    }
    // End Constructor method /setMinMaxFilterState/


  });

  // ------------------- END MODEL CONSTRUCTOR ----------------------------


  // Return Public methods
  return FilterModel;

});