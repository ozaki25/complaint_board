var $ = require('jquery');
var _ = require('underscore');
var Validation = require('backbone.validation');
var Marionette = require('backbone.marionette');
var Comment = require('../../models/Comment');

module.exports = Marionette.ItemView.extend({
    template: '#form_view',
    ui: {
        selectCategory:'select.category',
        inputContent:'input.content',
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
        this.model = new Comment();
        Validation.bind(this, {
            valid: function(view, attr) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.removeClass('has-error');
                group.find('.help-inline').empty();
            },
            invalid: function(view, attr, error) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.addClass('has-error');
                var target = group.find('.help-inline');
                target.text(error);
            }
        });

        var category = this.ui.selectCategory.children(':checked').val();
        var content = this.ui.inputContent.val().trim();
        this.model.set({category: category, content: content});
        if(this.model.isValid(true)) {
            this.model.save();
            this.collection.add(this.model);
            this.ui.inputs.val('');
        }
    }
});
