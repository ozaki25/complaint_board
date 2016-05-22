var Marionette = require('backbone.marionette');
var CategoryView = require('./CategoryView');

module.exports = Marionette.CompositeView.extend({
    className: 'container',
    childView: CategoryView,
    childViewContainer: '#show_categories',
    template: '#categories_main_view'
});

