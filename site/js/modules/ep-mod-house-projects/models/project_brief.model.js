/**
 * Created by 123 on 11.05.2016.
 * Brief project model
 * project_brief.model.js
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
  'backbone'
], function ( $, _, Backbone) {
  "use strict";


  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var configMap = {
      mod_path : 'js/modules/ep-mod-house-projects/'
    },
    ProjectBriefModel;

  // ------------------ END MODULE SCOPE VARIABLES ------------------------


  // --------------------- BEGIN CONSTRUCTOR ------------------------------

  ProjectBriefModel = Backbone.Model.extend({

    //
    // Begin Constructor method /initialize/
    //
    // Purpose   : invoked on initialization
    // Arguments : none
    // Action    :
    //   * convert 'tech' code value to template readable value
    //   * convert 'realized' code value to template readable value
    //   * convert 'thumb_img' local module path to global
    // Return    : none
    // Throws    : none
    //
    initialize : function () {
      this.setTechName();
      this.setStatus();
      this.setImgUrl();
    },
    // End Constructor method /initialize/


    // Begin Constructor method /setTechName/
    //
    // Purpose   : convert 'tech' code value to template readable value
    // Arguments : none
    // Action    :
    //   * get model key 'tech' value
    //   * switch to proper case
    //   * set model key 'tech_name' value to user friendly
    // Return    : none
    // Throws    : none
    //
    setTechName : function() {
      var tech;
      tech = this.get( 'tech' );
      switch ( tech ){
        case 'profiled-beam':
          this.set({ tech_name : 'Профилированный брус' });
          break;
        case 'laften':
          this.set({ tech_name : 'Лафет' });
          break;
      }
    },
    // End Constructor method /setStatus/


    // Begin Constructor method /setTechName/
    //
    // Purpose   : convert 'realized' code value to template readable value
    // Arguments : none
    // Action    :
    //   * get model key 'realized' value
    //   * switch to proper case
    //   * set model key 'status' value to user friendly
    // Return    : none
    // Throws    : none
    //
    setStatus : function() {
      var status;
      status = this.get( 'realized' );
      switch ( status ) {
        case 'in-progress':
          this.set({ status : 'В процессе' });
          break;
        default :
          this.set({ status : 'Построен ' + status });
      }
    },
    // End Constructor method /setTechName/

    // Begin Constructor method /setImgUrl/
    //
    // Purpose   : convert module local image path to global
    // Arguments : none
    // Action    :
    //   * get local module image path
    //   * get global module path
    //   * set image path to global
    // Return    : none
    // Throws    : none
    //
    setImgUrl : function () {
      var img_url;
      img_url = this.get( 'thumb_img' );
      img_url = configMap.mod_path + img_url;
      this.set({ "img_url" : img_url });
    }
    // End Constructor method /setImgUrl/
  });

  // ------------------------ END CONSTRUCTOR ----------------------------


  // Return constructor
  return ProjectBriefModel;

});