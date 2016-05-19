var _ = require('underscore');
var Backbone = require('backbone');
var LocalStorage = require('backbone.LocalStorage');
var Category = require('../models/Category');

module.exports = Backbone.Collection.extend({
    mdoel: Category,
    localStorage: new LocalStorage('ComplaintBoard.categories'),
    addDefault: function() {
        var categoryList = ['楽しいこと', '楽しくないこと'];
        _(categoryList).each(function(category) {
            this.create({name: category});
        }.bind(this));
    }
});
