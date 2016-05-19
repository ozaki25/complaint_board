var $ = jQuery = require('jquery');
var Bootstrap = require('bootstrap');
var Marionette = require('backbone.marionette');
var Comments = require('./collections/Comments');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/MainView');

var comments = new Comments();
var App = new Marionette.Application({
    regions: {
        header: '#header',
        main: '#main'
    },
    onStart: function() {
        comments.fetch().done(function() {
            this.header.show(new HeaderView());
            this.main.show(new MainView({collection: comments}));
        }.bind(this));
    }
});

App.start();
