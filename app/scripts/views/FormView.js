var _ = require('underscore');
var Marionette = require('backbone.marionette');
var Categories = require('../collections/Categories');

module.exports = Marionette.ItemView.extend({
    template: '#form_view',
    ui: {
        selectCategory:'select.category',
        inputComment:'input.comment',
        inputs:'input'
    },
    events: {
        'click .create-comment-btn': 'onClickCreate'
    },
    initialize: function(options) {
        this.categories = options.categories;
    },
    templateHelpers: function () {
        return {
            categoryList: function() {
                return _(this.categories.models).map(function(category) {
                    return '<option value="' + category.get('name') + '">' + category.get('name') + '</option>';
                }).join('');
            }.bind(this)
        }
    },
    onClickCreate: function() {
        var category = this.ui.selectCategory.children(':checked').val();
        var comment = this.ui.inputComment.val().trim();
        this.collection.create({category: category, content: comment});
        this.ui.inputs.val('');
    }
});
