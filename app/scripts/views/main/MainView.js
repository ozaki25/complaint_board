var _ = require('underscore');
var Marionette = require('backbone.marionette');
var Categories = require('../../collections/Categories');
var Comments = require('../../collections/Comments');
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
        'click:category': 'showSelectCategory',
        'click:previous': 'showPreviousCategory',
        'click:next': 'showNextCategory'
    },
    initialize: function() {
        this.categoryList = new Categories();
    },
    onRender: function() {
        var formView = new FormView({collection: this.collection, categories: this.categoryList});
        var categoriesView = new CategoriesView({collection: this.categoryList});

        this.form.show(formView);
        this.categories.show(categoriesView);
        this.showComments(this.categoryList.models[0], true, false);
    },
    refreshComments: function(model) {
        var currentView = this.comments.currentView;
        var currentCategory = currentView.model.get('name');
        var createdCategory = model.get('category');

        if(createdCategory === currentCategory) {
            this.showComments(currentView.model, currentView.first, currentView.last);
        }
    },
    showSelectCategory: function(view) {
        var currentPosition = _(this.categoryList.models).indexOf(view.model);
        var first = currentPosition === 0;
        var last = currentPosition === this.categoryList.length - 1;
        this.showComments(view.model, first, last);
    },
    showPreviousCategory: function(view) {
        var currentPosition = _(this.categoryList.models).indexOf(view.model);
        var previous = this.categoryList.models[currentPosition - 1];
        if(previous) {
            var isFirst = currentPosition === 1;
            this.showComments(previous, isFirst, false);
        }
    },
    showNextCategory: function(view) {
        var currentPosition = _(this.categoryList.models).indexOf(view.model);
        var next = this.categoryList.models[currentPosition + 1];
        if(next) {
            var isLast = currentPosition + 2 === this.categoryList.length;
            this.showComments(next, false, isLast)
        }
    },
    showComments: function(category, first, last) {
        var commentsWithCategory = new Comments(this.collection.withCategory(category.get('name')));
        var commentsView = new CommentsView({collection: commentsWithCategory, model: category, first: first, last: last});
        this.comments.show(commentsView);
    }
});

