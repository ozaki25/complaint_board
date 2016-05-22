var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
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
