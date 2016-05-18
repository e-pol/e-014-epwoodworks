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

define([
  'jquery',
  'underscore',
  'backbone',
  'epModHP/models/project_brief.model'
  ], function ( $, _, Backbone, ProjectBriefModel ) {
  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var
    configMap = {
      id : 'EP_MOD_HOUSE_PROJECTS_PROJECTS_COLLECTION'
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
    initialize : function ( models, init_data ) {
      this.id = configMap.id;

      console.log( '(ep-mod-hp) ' + this.id + ' initiated' );

      this.addProjectModels( init_data );
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
    }
    // End Constructor method /addProjectBriefModel/
  });

  // -------------------- END COLLECTION CONSTRUCTOR ----------------------

  // Return constructor
  return ProjectBriefCollection;

});