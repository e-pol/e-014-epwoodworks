/**
 * Created by 123 on 11.05.2016.
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

// The main controller API
// -----------------
//
// The main controller is available at requireJS path:
// 'epModHouseProjects/views/main.view'.
//
// The main controller provides methods and events to manage the module
// 'ep-mod-house-projects'.
//
// Its Public methods include:
//   * init() - instantiate new module controller. If module controller has
//   been initiated previously it does nothing and return false
//   * config() - set module adjustments
//   * start() - direct module to begin offering its capabilities to user
//   * stop() - direct module to end offering its capabilities to user
//   * requestService() - request module special services without starting it
//
define([
  'jquery',
  'underscore',
  'backbone',
  'epModHP/models/main.model',
  'epModHP/views/filters.view',
  'epModHP/views/projects.view',
  'text!epModHP/templates/main.template.html'

  ], function( $, _, Backbonel,
               model, FiltersView, ProjectsView,
               mainTemplate ) {

    "use strict";


    // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

    var
      configMap = {},

      stateMap = {
        is_initiated : false,
        module       : null
      },

      MainView, config, init, start, stop, requestService;

    // --------------------- END MODULE SCOPE VARIABLES ---------------------


    // -------------------- BEGIN MODULE CONSTRUCTORS -----------------------

    MainView = Backbonel.View.extend( {
      class_id : 'EP_MOD_HOUSE_PROJECTS_MAIN_VIEW',

      $containers : {
        projects : {
          selector : '#ep-mod-house-projects-collection-container'
        },
        filters  : {
          selector : '#ep-mod-house-projects-filters-container'
        }
      },

      events : {
        'click #ep-mod-house-projects-collection-sort' : 'onClickSort'
      },

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
        // store this module outer container reference
        this.$container = init_data.$container;

        console.log( '(ep-mod-hp) ' + this.class_id + ' initiated' );

        // initiate model
        model.init();

        // initiate filters
        /*stateMap.filters.$container
          = $( configMap.filters.$container_selector );
        filters.init({ $container : stateMap.filters.$container });*/

        // populate template with module data
        this.render();

        // initiate projects
        this.projectsView = new ProjectsView({
          collection : model.getProjectsCollection()
        });

        // add projects elem to its container (in this view elem)
        this.$( this.$containers.projects.selector )
          .html( this.projectsView.render().$el );

        // add html to inner container
        this.$container.append( this.$el );
      },

      template : _.template( mainTemplate ),

      render : function () {
        this.$el.html( this.template );
      },

      onClickSort : function ( event ) {
        event.preventDefault();
        console.log( 'sort-request' );
      }

    });

    // --------------------- END MODULE CONSTRUCTORS ------------------------


    //-------------------------- BEGIN PUBLIC METHODS -----------------------

    // Begin Public method /init/
    //
    // Example   : mainView.init()
    // Purpose   : Instantiate new controller
    // Arguments :
    //   * init_data - initialization map object
    //     ** $container - html element to contain module html
    // Action    :
    //   * instantiate controller as new Backbone.View
    // Returns   :
    //   * true  - controller successfully initiated
    //   * false - controller was initiated previously
    // Throws    : none
    //
    init = function ( init_data ) {
      if ( ! stateMap.is_initiated ) {
        stateMap.is_initiated = true;
        stateMap.module = new MainView( init_data );
        return true;
      }
      return false;
    };
    // End Public method /init/

    // Begin Public method /start/
    //
    // Example   : mainView.start()
    // Purpose   : direct module to begin offering its capabilities to user
    // Arguments :
    //   * data - proposed data
    // Action    :
    // Returns   : none
    // Throws    : none
    //
    start = function ( data ) {
      stateMap.module.start( data );
    };
    // End Public method /start/

    // ------------------------- END PUBLIC METHODS -------------------------


    // Return Public methods
    return {
      config         : config,
      init           : init,
      requestService : requestService
    };

  }
);
