var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var Categories = require('../../collections/Categories');
var Comments = require('../../collections/Comments');
var FormView = require('./FormView');
var CategoriesView = require('./CategoriesView');
var CommentsView = require('./CommentsView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#main_view',
    regions: {
        form: '#new_comment',
        categories: '#categories',
        comments: '#comments'
    },
    collectionEvents: {
        'add': 'addCommentToCurrentView'
    },
    childEvents: {
        'click:category': 'showSelectCategory',
        'click:previous': 'showPreviousCategory',
        'click:next': 'showNextCategory'
    },
    initialize: function(options) {
        this.categoryList = options.categoryList;
    },
    onRender: function() {
        var formView = new FormView({collection: this.collection, categories: this.categoryList});
        var categoriesView = new CategoriesView({collection: this.categoryList});

        this.form.show(formView);
        this.categories.show(categoriesView);
        this.showComments(this.categoryList.models[0]);
    },
    addCommentToCurrentView: function(comment) {
        var currentView = this.comments.currentView;
        var currentCategory = currentView.category.get('name');
        var createdCategory = comment.get('category');
        if(createdCategory === currentCategory) currentView.collection.add(comment);
    },
    showSelectCategory: function(categoryView) {
        this.showComments(categoryView.model);
    },
    showPreviousCategory: function(commentView) {
        var currentPosition = commentView.category.getPosition();
        var previous = this.categoryList.models[currentPosition - 1];
        if(previous) this.showComments(previous);
    },
    showNextCategory: function(commentView) {
        var currentPosition = commentView.category.getPosition();
        var next = this.categoryList.models[currentPosition + 1];
        if(next) this.showComments(next)
    },
    showComments: function(category) {
        var commentsWithCategory = new Comments(this.collection.withCategory(category.get('name')));
        var commentsView = new CommentsView({collection: commentsWithCategory, category: category});
        this.comments.show(commentsView);
    }
});

