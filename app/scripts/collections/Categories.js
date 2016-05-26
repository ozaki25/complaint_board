var _ = require('underscore');
var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var Category = require('../models/Category');

module.exports = Backbone.Collection.extend({
    model: Category,
    url: 'http://localhost:3030/categories',
    //localStorage: new Backbone.LocalStorage('ComplaintBoard.categories'),
    addDefault: function() {
        var categoryList = [ '楽しくない仕事', 'いらいらする仕事', 'つまんない仕事'];
        _(categoryList).each(function(category) {
            this.create({name: category});
        }.bind(this));
    }
});
