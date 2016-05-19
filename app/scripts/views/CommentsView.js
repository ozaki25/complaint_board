var Marionette = require('backbone.marionette');
var CommentView = require('./CommentView');

module.exports = Marionette.CompositeView.extend({
    className: 'panel panel-primary',
    childView: CommentView,
    childViewContainer: '#comments',
    template: '#comments_view'
});

