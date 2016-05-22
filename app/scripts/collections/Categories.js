var _ = require('underscore');
var Backbone = require('backbone');
var LocalStorage = require('backbone.LocalStorage');
var Category = require('../models/Category');

module.exports = Backbone.Collection.extend({
    mdoel: Category,
    localStorage: new LocalStorage('ComplaintBoard.categories'),
    initialize: function() {
        this.fetch().done(function() {
            if(!this.length) this.addDefault();
        }.bind(this));
    },
    addDefault: function() {
        var categoryList = [ '楽しくない仕事', 'いらいらする仕事', 'つまんない仕事'];
        _(categoryList).each(function(category) {
            this.create({name: category});
        }.bind(this));
    }
});
