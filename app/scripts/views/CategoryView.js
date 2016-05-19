var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'a',
    className: 'list-group-item',
    template: '#category_view',
    attributes: {
        'href': '#'
    }
});

