var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var Comments = require('../../collections/Comments');
var FormView = require('./FormView');
var CategoriesView = require('./CategoriesView');
var CommentsView = require('./CommentsView');
var AlertView = require('../AlertView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#main_view',
    regions: {
        alert: '#alert',
        form: '#new_comment',
        categories: '#categories',
        comments: '#comments'
    },
    collectionEvents: {
        'add': 'addCommentToCurrentView showAddedAlert',
        'remove': 'showRemovedAlert'
    },
    childEvents: {
        'click:category': 'showSelectedCategory',
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
        if(currentView.category.isAdded(comment)) currentView.collection.add(comment);
    },
    showAddedAlert: function() {
        this.showAlert('success', 'コメントを登録しました。');
    },
    showRemovedAlert: function() {
        this.showAlert('success', 'コメントを削除しました。');
    },
    showSelectedCategory: function(categoryView) {
        this.showComments(categoryView.model);
    },
    showPreviousCategory: function(commentView) {
        var previous = commentView.category.previous();
        if(previous) this.showComments(previous);
    },
    showNextCategory: function(commentView) {
        var next = commentView.category.next();
        if(next) this.showComments(next)
    },
    showComments: function(category) {
        if(category) {
            var commentsWithCategory = new Comments(this.collection.withCategory(category.id));
            var commentsView = new CommentsView({collection: commentsWithCategory, category: category});
            this.comments.show(commentsView);
        }
    },
    showAlert: function(type, message) {
        var alertView = new AlertView({type: type, message: message});
        this.alert.show(alertView);
    }
});

