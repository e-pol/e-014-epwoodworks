/**
 * Created by 123 on 18.05.2016.
 * Project brief view
 * project_brief.view.js
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
  'text!epModHP/templates/project_brief.view.template.html'
  ], function ( $, _, Backbone, projectBriefViewTemplate) {
  "use strict";

  var ProjectBriefView = Backbone.View.extend({
    tagName   : 'div',
    className : 'ep-mod-house-projects-collection-gallery-project col-md-4',

    template  : _.template( projectBriefViewTemplate ),

    initialize : function () {

    },

    render : function () {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }

  });

  return ProjectBriefView;

});
