var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    tagName: 'p',
    template: '#comment_view'
});

