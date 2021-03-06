var $ = jQuery = require('jquery');
require('bootstrap');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var Comments = require('./collections/Comments');
var Categories = require('./collections/Categories');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/comments/MainView');
var CategoryMainView = require('./views/categories/MainView');

var comments = new Comments();
var categories = new Categories();

var appRouter = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
        "": "comments",
        "comments": "comments",
        "categories": "categories"
    },
    initialize: function() {
        app.header.show(new HeaderView());
    },
    controller: {
        comments: function() {
            categories.fetch().done(function() {
                comments.fetch().done(function() {
                    var mainView = new MainView({collection: comments, categoryList: categories});
                    app.main.show(mainView);
                });
            });
        },
        categories: function() {
            categories.fetch().done(function() {
                var categoryMainView = new CategoryMainView({collection: categories});
                app.main.show(categoryMainView);
            });
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
