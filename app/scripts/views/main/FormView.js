var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var Comment = require('../../models/Comment');

module.exports = Backbone.Marionette.ItemView.extend({
    template: '#form_view',
    ui: {
        selectCategory: 'select.category',
        inputContent:   'input.content',
        inputs:         'input',
        createBtn:      '.create-comment-btn'
    },
    events: {
        'keypress': 'preventSubmit',
        'keypress @ui.createBtn': 'onKeypressCreate',
        'click @ui.createBtn': 'onClickCreate'
    },
    initialize: function(options) {
        this.categories = options.categories;
    },
    templateHelpers: function() {
        return {
            categoryList: function() {
                return _(this.categories.models).map(function(category) {
                    var categoryName = category.get('name');
                    return '<option value="' + categoryName + '">' + categoryName + '</option>';
                }).join('');
            }.bind(this)
        }
    },
    preventSubmit: function(e) {
        var enter = 13;
        if(e.which === enter) e.preventDefault();
    },
    onKeypressCreate: function(e) {
        var enter = 13;
        if(e.which === enter) this.createComment();
    },
    onClickCreate: function() {
        this.createComment();
    },
    createComment: function() {
        this.model = new Comment();
        this.bindBackboneValidation();

        var category = this.ui.selectCategory.children(':checked').val();
        var content = this.ui.inputContent.val().trim();
        this.model.set({category: category, content: content});
        if(this.model.isValid(true)) {
            this.setCSRFToken();
            this.collection.create(this.model);
            this.ui.inputs.val('');
        }
    },
    bindBackboneValidation: function() {
        Backbone.Validation.bind(this, {
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
    },
    setCSRFToken: function() {
        var token = $('meta[name="csrf-token"]').attr('content');
        console.log('token', token);
        Backbone.Model.prototype.toJSON = function() {
            return _(_.clone(this.attributes)).extend({
                authenticity_token: token
            });
        };
    }
});
