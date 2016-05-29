var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var Comment = require('../../models/Comment');

module.exports = Backbone.Marionette.ItemView.extend({
    template: '#form_view',
    ui: {
        selectCategory: 'select.categoryId',
        inputContent:   'input.content',
        createBtn:      '.create-comment-btn'
    },
    events: {
        'keypress @ui.inputContent': 'preventSubmit',
        'click @ui.createBtn': 'onClickCreate'
    },
    initialize: function(options) {
        this.categories = options.categories;
    },
    templateHelpers: function() {
        return {
            categoryList: function() {
                return _(this.categories.models).map(function(category) {
                    return '<option value="' + category.id + '">' + category.get('name') + '</option>';
                }).join('');
            }.bind(this)
        }
    },
    preventSubmit: function(e) {
        var enter = 13;
        if(e.which === enter) e.preventDefault();
    },
    onClickCreate: function() {
        this.model = new Comment();
        this.bindBackboneValidation();

        var categoryId = this.ui.selectCategory.children(':checked').val();
        var content = this.ui.inputContent.val().trim();
        this.model.set({categoryId: categoryId, content: content});
        if(this.model.isValid(true)) {
            this.collection.create(this.model,{wait: true});
            this.ui.inputContent.val('');
        }
    },
    bindBackboneValidation: function() {
        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.removeClass('has-error').find('.help-inline').empty();
            },
            invalid: function(view, attr, error) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.addClass('has-error').find('.help-inline').text(error);
            }
        });
    }
});
