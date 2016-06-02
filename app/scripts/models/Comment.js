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
    },
    parse: function(response) {
        if(!response.categoryId) {
            response.categoryId = response.category.id;
            delete response.category;
        }
        return response;
    },
    belongTo: function(category) {
        return this.get('categoryId') === category.id;
    }
});
