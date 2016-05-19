var Backbone = require('backbone');
var LocalStorage = require('backbone.LocalStorage');

module.exports = Backbone.Model.extend({
    localStorage: new LocalStorage('ComplaintBoard.comments'),
    validation: {
        content: {
            required: true
        }
    }
});
