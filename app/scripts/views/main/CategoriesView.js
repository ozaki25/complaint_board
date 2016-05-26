var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var CategoryView = require('./CategoryView');

module.exports = Backbone.Marionette.CompositeView.extend({
    className: 'panel panel-info',
    childView: CategoryView,
    childViewContainer: '#categories',
    template: '#categories_view'
});
