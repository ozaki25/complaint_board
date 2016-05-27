var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    validation: {
        categoryId: {
            required: true,
            msg: '必須項目です。'
        },
        content: {
            required: true,
            msg: '必須項目です。'
        }
    }
});
