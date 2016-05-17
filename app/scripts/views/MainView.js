var Marionette = require('backbone.marionette');
var FormView = require('./FormView');
var CategoriesView = require('./CategoriesView');
var CommentsView = require('./CommentsView');

module.exports = Marionette.LayoutView.extend({
    template: '#main_view',
    regions: {
        form: '#new_comment',
        categories: '#categories',
        comments: '#comments'
    },
    onRender: function() {
        this.form.show(new FormView());
        this.categories.show(new CategoriesView());
        this.comments.show(new CommentsView());
    }
});

