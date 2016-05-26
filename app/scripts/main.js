var $ = jQuery = require('jquery');
require('bootstrap');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

var Comments = require('./collections/Comments');
var Categories = require('./collections/Categories');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/main/MainView');
var CategoryMainView = require('./views/categories/MainView');

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
            console.log("fetch");
            categories.fetch({dataType: 'jsonp'});
                console.log(categories);
            //if(!categories.length) categories.addDefault();
                var mainView = new MainView({collection: comments, categoryList: categories});
                app.main.show(mainView);
        },
        categories: function() {
            var categoryMainView = new CategoryMainView({collection: categories});
            app.main.show(categoryMainView);
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
