/**
 * Created by 123 on 18.05.2016.
 * Projects view
 * projects.view.js
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
  'epModHP/views/project_brief.view',
  'text!epModHP/templates/projects.view.template.html'
  ], function ( $, _, Backbone, ProjectBriefView, projectsViewTemplate ) {
  "use strict";


  // ------------------------- Begin Constructor ----------------------------

  var ProjectsView = Backbone.View.extend({
    // Constructor id
    class_id : 'EP_MOD_HOUSE_PROJECTS_PROJECTS_VIEW',

    template : _.template( projectsViewTemplate ),

    //
    // Begin Constructor method /initialize/
    //
    // Purpose   : invoked on initialization
    // Arguments :
    //   * init_data - configuration data
    // Action    :
    //   *
    // Return    : none
    // Throws    : none
    //
    initialize : function ( init_data ) {
      console.log( '(ep-mod-hp) ' + this.class_id + ' initiated' );
    },
    // End Constructor method /initialize/

    render : function () {
      this.$el.html( this.template );
      this.$projects = this.$('#ep-mod-house-projects-collection-gallery');

      this.collection.forEach( function ( project_model ) {
        this.renderProject( project_model );
      }, this );
      return this;
    },

    renderProject : function ( project_model ) {
      var projectBriefView = new ProjectBriefView({
        model : project_model
      });

      this.$projects.append( projectBriefView.render().el );
    }

  });

  // -------------------------- End Constructor -----------------------------


  // Return constructor
  return ProjectsView;

});
