var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'ul',
    template: '#comment_view'
});

