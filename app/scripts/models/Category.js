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
    },
    isFirst: function() {
        return this.id === _(this.collection.models).first().id;
    },
    isLast: function() {
        return this.id === _(this.collection.models).last().id;
    }
});
