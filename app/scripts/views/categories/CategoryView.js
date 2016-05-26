var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: '#category_item_view',
    events: {
        'click .delete': 'onClickDelete'
    },
    onClickDelete: function(e) {
        e.preventDefault();
        this.model.destroy();
    }
});
