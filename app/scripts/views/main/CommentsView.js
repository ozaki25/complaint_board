var Marionette = require('backbone.marionette');
var CommentView = require('./CommentView');

module.exports = Marionette.CompositeView.extend({
    className: 'panel panel-primary',
    childView: CommentView,
    childViewContainer: '#comments',
    template: '#comments_view',
    events: {
        'click #previous-category': 'onClickPreviousButton',
        'click #next-category': 'onClickNextButton'
    },
    ui: {
        'previous': '#previous-category',
        'next': '#next-category'
    },
    initialize: function(options) {
        this.first = options.first;
        this.last = options.last;
    },
    onRender: function() {
        if(this.first) this.ui.previous.closest('li').addClass('disabled');
        if(this.last) this.ui.next.closest('li').addClass('disabled');
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

