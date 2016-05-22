var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#category_item_view'
});
