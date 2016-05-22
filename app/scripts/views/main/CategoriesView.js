var Marionette = require('backbone.marionette');
var CategoryView = require('./CategoryView');

module.exports = Marionette.CompositeView.extend({
    className: 'panel panel-success',
    childView: CategoryView,
    childViewContainer: '#categories',
    template: '#categories_view'
});

