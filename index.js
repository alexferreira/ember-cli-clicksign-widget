/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-clicksign-widget',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/clicksign.js');
  }
};
