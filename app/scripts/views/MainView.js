var Marionette = require('backbone.marionette');
var Categories = require('../collections/Categories');
var FormView = require('./FormView');
var CategoriesView = require('./CategoriesView');
var CommentsView = require('./CommentsView');

module.exports = Marionette.LayoutView.extend({
    className: 'container',
    template: '#main_view',
    regions: {
        form: '#new_comment',
        categories: '#categories',
        comments: '#comments'
    },
    onRender: function() {
        var categories = new Categories();
        categories.fetch().done(function() {
            if(!categories.length) categories.addDefault();
        });
        this.form.show(new FormView({collection: this.collection}));
        this.categories.show(new CategoriesView({collection: categories}));
        this.comments.show(new CommentsView({collection: this.collection}));
    }
});

