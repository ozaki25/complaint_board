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
        var alertView = new AlertView({type: 'success', message: 'カテゴリを登録しました。'});
        this.showAlert(alertView);
    },
    removeCategory: function() {
        var alertView = new AlertView({type: 'success', message: 'カテゴリを削除しました。'});
        this.showAlert(alertView);
    },
    showAlert: function(view) {
        this.alert.show(view);
    }
});

