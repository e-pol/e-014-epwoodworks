/**
 * site.channel.js
 * Global site channel for event triggering and listening
 * Created by 123 on 08.05.2016.
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
  'underscore',
  'backbone'
  ], function ( _, Backbone ) {
  "use strict";

  // ----------------- BEGIN MODULE SCOPE VARIABLES -----------------------

  var channel;

  // --------------------- END MODULE SCOPE VARIABLES ---------------------

  // Create new channel object
  channel = _.extend({}, Backbone.Events);
  channel.id = "EP_SITE_CHANNEL";

  // return channel object
  return channel;
});