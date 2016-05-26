var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    validation: {
        content: {
            required: true,
            msg: '必須項目です。'
        }
    }
});
