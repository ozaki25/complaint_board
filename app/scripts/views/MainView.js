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
        var firstCategory = categories.models[0];
        var commentsWithCategory = new Comments(this.collection.withCategory(firstCategory.get('name')));

        var formView = new FormView({collection: this.collection, categories: categories});
        var categoriesView = new CategoriesView({collection: categories});
        var commentsView = new CommentsView({collection: commentsWithCategory, model: firstCategory});

        this.form.show(formView);
        this.categories.show(categoriesView);
        this.comments.show(commentsView);
    },
    refreshComments: function(model) {
        var createdCategory = model.get('category');
        var currentViewCategory = this.comments.currentView.model.get('name');

        if(createdCategory === currentViewCategory) {
            var commentsWithCategory = new Comments(this.collection.withCategory(currentViewCategory));
            var commentsView = new CommentsView({collection: commentsWithCategory, model: this.comments.currentView.model});
            this.comments.show(commentsView);
        }
    },
    showComments: function(view) {
        var category = view.model;
        var commentsWithCategory = new Comments(this.collection.withCategory(category.get('name')));
        var commentsView = new CommentsView({collection: commentsWithCategory, model: category});
        this.comments.show(commentsView);
    }
});

