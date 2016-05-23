/**
 * Created by 123 on 12.05.2016.
 * Main module model
 * main.model.js
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
  'epModHP/collections/projects.collection',
  'epModHP/collections/filters.collection',
  'json!epModHP/data/model.data.json'
  ], function ( $, _, Backbone,
                ProjectsCollection,
                FiltersCollection,
                modelData ) {
  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var
    configMap = { id : 'EP_MOD_HOUSE_PROJECTS_MAIN_MODEL' },
    stateMap = {
      is_initiated        : false,
      model               : null,
      projects_collection : null,
      filters_collection  : null
    },
    Model, init, getProjectsCollection;

  // ------------------- END MODULE SCOPE VARIABLES -----------------------


  // --------------------- BEGIN MODULE CONSTRUCTORS ----------------------

  Model = Backbone.Model.extend({
    //
    // Begin Constructor method /initialize/
    //
    // Purpose   : invoked on initialization
    // Arguments :
    //   * init_data - configuration data
    // Action    :
    //   * set model id
    //   * create project models collection
    //   * create filter models collection
    // Return    : none
    // Throws    : none
    //
    initialize : function ( init_data ) {
      this.id = configMap.id;

      console.log( '(ep-mod-hp) ' + this.id + ' initiated' );

      this.setProjectsCollection( init_data );
    },

    // Begin Constructor method /setProjectsCollection/
    //
    // Example   : this.setProjectsCollection( {...} )
    // Purpose   : create collection of project brief models
    // Arguments : project list map in JSON format
    // Action    :
    //   * check if collection doesn`t exist, then create it
    // Return    : none
    // Throws    : none
    //
    setProjectsCollection : function ( project_list_brief ) {
      if ( ! stateMap.projects_collection ) {
        stateMap.projects_collection =
          new ProjectsCollection( null, project_list_brief );
      }
    }
    // End Constructor method /setProjectsCollection/

  });

  // ---------------------- END MODULE CONSTRUCTORS -----------------------


  //-------------------------- BEGIN PUBLIC METHODS -----------------------

  // Begin Public method /init/
  //
  // Example   : model.init()
  // Purpose   : Instantiate new model
  // Arguments :
  //   * init_data - initialization map object
  // Action    :
  //   * instantiate model as new Backbone.Model
  // Returns   :
  //   * true  - model successfully initiated
  //   * false - model was initiated previously
  // Throws    : none
  //
  init = function () {
    if ( ! stateMap.is_initiated ) {
      stateMap.is_initiated = true;
      stateMap.model = new Model( modelData );
      return true;
    }
    return false;
  };
  // End Public method /init/

  // Begin Public method /getProjectsCollection/
  //
  // Example   : model.getProjectsCollection()
  // Purpose   : get projects collection
  // Arguments : none
  // Action    :
  //   *
  // Returns   :
  //   * projects collection
  //   * false - if projects collection doesn`t exist
  // Throws    : none
  //
  getProjectsCollection = function () {
    if ( stateMap.projects_collection ) {
      return stateMap.projects_collection;
    }
    return false;
  };
  // End Public method /getProjectsCollection/

  // ------------------------- END PUBLIC METHODS -------------------------
  

  return {
    init                  : init,
    getProjectsCollection : getProjectsCollection
  };

});