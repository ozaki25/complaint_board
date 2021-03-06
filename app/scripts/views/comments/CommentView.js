var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.ItemView.extend({
    tagName: 'ul',
    template: '#comment_view',
    events: {
        'click .delete': 'onClickDelete'
    },
    onClickDelete: function(e) {
        e.preventDefault();
        this.model.destroy({wait: true});
    }
});
