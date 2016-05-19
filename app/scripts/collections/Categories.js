var _ = require('underscore');
var Backbone = require('backbone');
var Category = require('../models/Category');

module.exports = Backbone.Collection.extend({
    mdoel: Category,
    initialize: function() {
        this.addDefault();
    },
    addDefault: function() {
        var categoryList = [ '楽しくない仕事', 'いらいらする仕事', 'つまんない仕事'];
        _(categoryList).each(function(category) {
            this.add({name: category});
        }.bind(this));
    }
});
