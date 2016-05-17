var Backbone = require('backbone');
var LocalStorage = require('backbone.LocalStorage');
var Comment = require('../models/Comment');

module.exports = Backbone.Collection.extend({
    mdoel: Comment,
    localStorage: new LocalStorage('ComplaintBoard')
});
