var Backbone = require('backbone');
var LocalStorage = require('backbone.LocalStorage');

module.exports = Backbone.Model.extend({
    localStorage: new LocalStorage('ComplaintBoard.categories'),
    validation: {
        name: {
            required: true,
            msg: '必須項目です。'
        }
    }

});
