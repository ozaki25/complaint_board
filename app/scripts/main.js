var $ = jQuery = require('jquery');
require('bootstrap');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var Comments = require('./collections/Comments');
var Categories = require('./collections/Categories');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/main/MainView');
var CategoriesView = require('./views/categories/CategoriesView');

var comments = new Comments();
var categories = new Categories();

var appRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
        "": "main",
        "categories": "categories"
    },
    initialize: function() {
        app.header.show(new HeaderView());
    },
    controller: {
        main: function() {
            var mainView = new MainView({collection: comments, categoryList: categories});
            app.main.show(mainView);
        },
        categories: function() {
            var categoriesView = new CategoriesView({collection: categories});
            app.main.show(categoriesView);
        }
    }
});

var app = new Backbone.Marionette.Application({
    regions: {
        header: '#header',
        main: '#main'
    },
    onStart: function() {
        new appRouter();
        Backbone.history.start();
    }
});

app.start();
