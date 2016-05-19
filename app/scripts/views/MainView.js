var Marionette = require('backbone.marionette');
var Categories = require('../collections/Categories');
var Comments = require('../collections/Comments');
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
    collectionEvents: {
        'add': 'refreshComments'
    },
    childEvents: {
        'click:category': 'showComments'
    },
    onRender: function() {
        var categories = new Categories();
        categories.fetch().done(function() {
            if(!categories.length) categories.addDefault();
        });
        var firstCategory = categories.models[0];
        var commentsWithCategory = new Comments(this.collection.withCategory(firstCategory.get('name')));

        this.form.show(new FormView({collection: this.collection, categories: categories}));
        this.categories.show(new CategoriesView({collection: categories}));
        this.comments.show(new CommentsView({collection: commentsWithCategory, model: firstCategory}));
    },
    refreshComments: function(model) {
        var createdCategory = model.get('category');
        var currentViewCategory = this.comments.currentView.model.get('name');
        if(createdCategory === currentViewCategory) {
            var commentsWithCategory = new Comments(this.collection.withCategory(currentViewCategory));
            this.comments.show(new CommentsView({collection: commentsWithCategory, model: this.comments.currentView.model}));
        }
    },
    showComments: function(view) {
        var category = view.model;
        var commentsWithCategory = new Comments(this.collection.withCategory(category.get('name')));
        this.comments.show(new CommentsView({collection: commentsWithCategory, model: category}));
    }
});

