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
//   * validateFilterType()
//   * validateFilterValues()
//   * createFilter()
//   * createSimple()
//   * createMinMax()
//   * getFilterStateJSON()
//   * setFilterStateJSON()

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
      type        : 'simple',
      key         : null,
      is_selected : false,
      values      : []
    },

    valid : {
      types : [ 'simple', 'min_max' ]
    },

    initialize : function() {
      this.isValid();
      this.createFilter( this.get( 'type' ) );
      console.log( this.getFilterStateJSON() );
    },

    validate : function() {
      this.validateFilterType( this.get( 'type' ) );
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
        && this.valid.types.indexOf( filter_type ) >= 0 ) {
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

    // Begin Constructor method /getFilterStateJSON/
    //
    // Example   : this.getFilterStateJSON()
    // Purpose   : get filter state map in JSON format
    // Arguments : none
    // Action    :
    //   *
    // Throw     : none
    //
    getFilterStateJSON : function () {
      switch ( this.get( 'type' ) ) {
        case 'simple':
          return this.getSimpleFilterStateJSON();
          break;

        case 'min_max':
          break;
      }
      return false;
    },
    // End Constructor method /getFilterStateJSON/

    // Begin Constructor method /getSimpleFilterStateJSON/
    //
    // Example   : this.getSimpleFilterStateJSON()
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
    getSimpleFilterStateJSON : function () {
      var state_map = {};

      state_map.type   = this.get( 'type' );
      state_map.key    = this.get( 'key' );
      state_map.values = [];

      this.get( 'values' ).forEach( function( value_map ) {
        if ( value_map.is_selected ) {
          state_map.values.push( value_map.value );
        }
      }, this );

      return state_map;
    },
    // End Constructor method /getSimpleFilterStateJSON/

    // Begin Constructor method /getFilterStateJSON/
    //
    // Example   : this.setFilterStateJSON( { type :  } )
    // Purpose   : set filter state from map in JSON format
    // Arguments :
    // Action    :
    //   *
    // Return    : filter state map in JSON format
    // Throw     : none
    //
    setFilterStateJSON : function ( state_map ) {

    }
    // End Constructor method /setFilterStateJSON/

  });

  // ------------------- END MODEL CONSTRUCTOR ----------------------------


  // Return Public methods
  return FilterModel;

});