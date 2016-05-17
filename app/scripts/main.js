var Marionette = require('backbone.marionette');
var HeaderView = require('./views/HeaderView');
var MainView = require('./views/MainView');

var App = new Marionette.Application({
    regions: {
        header: '#header',
        main: '#main'
    },
    onStart: function() {
        this.header.show(new HeaderView());
        this.getRegion('main').show(new MainView());
    }
});

App.start();
