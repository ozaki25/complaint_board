var $ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Comments = require('./collections/Comments');
var Categories = require('./collections/Categories');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/main/MainView');
var CategoriesView = require('./views/categories/CategoriesView');

var comments = new Comments();
var appRouter = Marionette.AppRouter.extend({
    appRoutes: {
        ""                    : "main",
        "categories"          : "categories"
    },
    initialize: function() {
        app.header.show(new HeaderView());
    },
    controller: {
        main: function() {
            comments.fetch().done(function() {
                app.main.show(new MainView({collection: comments}));
            });
        },
        categories: function() {
            app.main.show(new CategoriesView({collection: new Categories()}));
        }
    }
});

var app = new Marionette.Application({
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
