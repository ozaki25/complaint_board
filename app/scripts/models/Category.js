var _ = require('underscore');
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
    validation: {
        name: {
            required: true,
            msg: '必須項目です。'
        }
    },
    getPosition: function() {
        return _(this.collection.models).indexOf(this);
    }
});
