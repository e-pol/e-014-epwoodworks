/**
 * Created by 123 on 12.05.2016.
 * Main module controller
 * main.view.js
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
  'epModHP/collections/project_brief_list.collection',
  'epModHP/collections/filter_list.collection',
  'json!epModHP/data/project_list_brief.json'
  ], function ( $, _, Backbone,
                ProjectsBriefListCollection,
                FilterListCollection,
                projectsListBriefJSON ) {
  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var
    configMap = {
    },
    stateMap = {
      model                   : null,
      projects_collection     : null,
      filters_collection      : null,
      is_initiated            : false,
      project_list_brief_json : projectsListBriefJSON
    },
    Model, init;

  // ------------------- END MODULE SCOPE VARIABLES -----------------------


  // --------------------- BEGIN MODULE CONSTRUCTORS ----------------------

  Model = Backbone.Model.extend({
    initialize : function () {

      this.setProjectsCollection(
        stateMap.project_list_brief_json.projects_list_brief_json
      );

      this.setFiltersCollection();
    },

    // Begin Constructor method /setProjectsCollection/
    //
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
          new ProjectsBriefListCollection( project_list_brief );
      }
    },
    // End Constructor method /setProjectsCollection/

    // Begin Constructor method /setFiltersCollection/
    //
    // Purpose   : create collection of filter models
    // Arguments : filter list map in JSON format
    // Action    :
    //   * check if collection doesn`t exist, then create it
    // Return    : none
    // Throws    : none
    //
    setFiltersCollection : function ( filter_list ) {
      if ( ! stateMap.filters_collection ) {
        stateMap.filters_collection = new FilterListCollection( filter_list );
      }
    }
    // End Constructor method /setFiltersCollection/

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
  init = function ( init_data ) {
    if ( ! stateMap.is_initiated ) {
      stateMap.is_initiated = true;
      stateMap.model = new Model( init_data );
      return true;
    }
    return false;
  };
  // End Public method /init/

  // ------------------------- END PUBLIC METHODS -------------------------
  

  return {
    init     : init
  };

});