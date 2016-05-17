var Backbone = require('backbone');
var LocalStorage = require('backbone.LocalStorage');
var Category = require('../models/Category');

module.exports = Backbone.Collection.extend({
    mdoel: Category,
    localStorage: new LocalStorage('ComplaintBoard')
});
