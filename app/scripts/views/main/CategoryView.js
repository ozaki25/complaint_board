var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'a',
    className: 'list-group-item',
    template: '#category_view',
    attributes: {
        'href': '#'
    },
    events: {
        'click': 'onClick'
    },
    onClick: function(e) {
        e.preventDefault();
        this.triggerMethod('click:category');
    }
});

