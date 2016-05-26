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
        console.log('getPosition');
        return _(this.collection.models).indexOf(this);
    }
});
