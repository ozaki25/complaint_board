var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');
var Comment = require('../models/Comment');

module.exports = Backbone.Collection.extend({
    model: Comment,
    localStorage: new Backbone.LocalStorage('ComplaintBoard.comments'),
    withCategory: function(category) {
        return this.where({category: category});
    }
});
