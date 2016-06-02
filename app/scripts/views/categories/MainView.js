var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
var CategoriesView = require('./CategoriesView');
var AlertView = require('../AlertView');

module.exports = Backbone.Marionette.LayoutView.extend({
    className: 'container',
    template: '#category_main_view',
    regions: {
        alert: '#alert',
        categoryPanel: '#category_panel'
    },
    collectionEvents: {
        'add': 'addCategory',
        'remove': 'removeCategory'
    },
    onRender: function() {
        var categoriesView = new CategoriesView({collection: this.collection});
        this.categoryPanel.show(categoriesView);
    },
    addCategory: function() {
        this.showAlert('success', 'カテゴリを登録しました。');
    },
    removeCategory: function() {
        this.showAlert('success', 'カテゴリを削除しました。');
    },
    showAlert: function(type, message) {
        var alertView = new AlertView({type: type, message: message});
        this.alert.show(alertView);
    }
});

