var Backbone = require('backbone');
var Comment = require('../models/Comment');

module.exports = Backbone.Collection.extend({
    model: Comment,
    url: 'http://localhost:3030/comments',
    withCategory: function(categoryId) {
        return this.where({categoryId: categoryId});
    }
});
