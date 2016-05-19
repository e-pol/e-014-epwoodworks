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

  var
    configMap = {
      ui : {
        sort : {
          class : {
            container : 'ep-mod-house-projects-collection-sort',
            active    : 'ep-mod-house-projects-collection-sort-active',
            asc       : 'ep-mod-house-projects-collection-sort-asc',
            desc      : 'ep-mod-house-projects-collection-sort-desc'
          }
        }
      }
    },

    ProjectsView;

  // ------------------------- Begin Constructor ----------------------------

  ProjectsView = Backbone.View.extend({
    // Constructor id
    class_id : 'EP_MOD_HOUSE_PROJECTS_PROJECTS_VIEW',

    template : _.template( projectsViewTemplate ),

    events : {
      'click #ep-mod-house-projects-collection-sort a' : 'onClickSort'
    },

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

      //
      //     ----->>>>> TODO <<<<<-----
      //
      // Need to get asc / desc class from collection on init,
      // then set it to template. Else template overrides classes
      //

      this.renderProjects();

      return this;
    },

    renderProjects : function () {

      this.$projects.empty();

      this.collection.forEach( function ( project_model ) {
        this.renderProject( project_model );
      }, this );
    },

    renderProject : function ( project_model ) {
      var projectBriefView = new ProjectBriefView({
        model : project_model
      });

      this.$projects.append( projectBriefView.render().el );
    },

    // Begin Constructor method /onClickSort/
    //
    // Example   : this.onClickSort()
    // Purpose   : handle clicks on sort elems
    // Arguments :
    //   * event - event object
    // Action    :
    //   * prevent default event action
    //   * call this.toggleSort() or this.newSort() method
    // Return    : none
    // Throw     : none
    //
    onClickSort : function ( event ) {
      var $parent;
      event.preventDefault();
      $parent = $(event.target ).parent();

      if ( $parent.hasClass( configMap.ui.sort.class.active ) ) {
        this.toggleSort( event );
      }
      else {
        this.newSort( event );
      }
    },
    // End Constructor method /onClickSort/

    // Begin Constructor method /toggleSort/
    //
    // Example   : this.toggleSort()
    // Purpose   : toggle elem classes
    // Arguments :
    //   * event - event object
    // Action    :
    //   * get target elem and make the jQuery object
    //   * toggle DOM classes representing ascending and descending order
    //   * request collection sort
    // Return    : none
    // Throws    : none
    //
    toggleSort : function ( event ) {
      console.log('toggle-sort');
      var elem, hash, $elem, order, key;
      elem    = event.target;
      hash    = elem.hash;
      $elem   = $( elem );

      $elem.toggleClass( function () {
        if ( $( this ).hasClass( configMap.ui.sort.class.asc ) ) {
          $( this ).removeClass( configMap.ui.sort.class.asc );
          order = 'desc';
          return configMap.ui.sort.class.desc;
        }
        else {
          $( this ).removeClass( configMap.ui.sort.class.desc );
          order = 'asc';
          return configMap.ui.sort.class.asc;
        }
      } );

      switch ( hash ) {
        case '#by-area':
          key = 'area';
          break;
        case '#by-name':
          key = 'code';
          break;
      }

      this.collection.changeOrderByKey( key, order );

      this.renderProjects();
    },
    // End Constructor method /toggleSort/

    // Begin Constructor method /newSort/
    //
    // Example   : this.newSort()
    // Purpose   : set new active sort elem (change its class)
    // Arguments :
    //   * event - event object
    // Action    :
    //   * remove proper class from previously active elem
    //   * add proper class to event target elem
    // Return    : none
    // Throws    : none
    //
    newSort : function ( event ) {
      console.log( 'new-sort' );
      var elem, hash, $elem, $parent, $list, $active;
      elem    = event.target;
      hash    = elem.hash;
      $elem   = $( elem );
      $parent = $elem.parent();
      $list   = $elem.parents( '.' + configMap.ui.sort.class.container );
      $active = $list.find( '.' + configMap.ui.sort.class.active );

      $active.removeClass( configMap.ui.sort.class.active );
      $parent.addClass( configMap.ui.sort.class.active );
    }
    // End Constructor method /newSort/

  });

  // -------------------------- End Constructor -----------------------------


  // Return constructor
  return ProjectsView;

});
