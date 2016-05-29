var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var CommentView = require('./CommentView');

module.exports = Backbone.Marionette.CompositeView.extend({
    className: 'panel panel-primary',
    childView: CommentView,
    childViewContainer: '#comments',
    template: '#comments_view',
    ui: {
        'previous': '#previous-category',
        'next': '#next-category'
    },
    events: {
        'click @ui.previous': 'onClickPreviousButton',
        'click @ui.next': 'onClickNextButton'
    },
    initialize: function(options) {
        this.category = options.category;
    },
    templateHelpers: function() {
        return {
            categoryName: this.category.get('name')
        };
    },
    onRender: function() {
        if(this.category.isFirst()) this.ui.previous.closest('li').addClass('disabled');
        if(this.category.isLast()) this.ui.next.closest('li').addClass('disabled');
    },
    onClickPreviousButton: function(e) {
        e.preventDefault();
        this.triggerMethod('click:previous');
    },
    onClickNextButton: function(e) {
        e.preventDefault();
        this.triggerMethod('click:next');
    }
});
