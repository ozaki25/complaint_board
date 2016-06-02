var $ = require('jquery');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var Category = require('../../models/Category');
var CategoryView = require('./CategoryView');

module.exports = Backbone.Marionette.CompositeView.extend({
    childView: CategoryView,
    childViewContainer: '#show_categories',
    template: '#category_panel_view',
    ui: {
        inputName: 'input.category-name',
        createBtn: '.create-category-btn'
    },
    events: {
        'keypress @ui.inputName': 'preventSubmit',
        'click @ui.createBtn': 'onClickCreate'
    },
    preventSubmit: function(e) {
        var enter = 13;
        if(e.which === enter) e.preventDefault();
    },
    onClickCreate: function() {
        this.model = new Category();
        this.bindBackboneValidation();

        var name = this.ui.inputName.val().trim();
        this.model.set({name: name});
        if(this.model.isValid(true)) {
            this.collection.create(this.model, {wait: true});
            this.ui.inputName.val('');
        }
    },
    bindBackboneValidation: function() {
        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.removeClass('has-error').find('.help-block').remove();
            },
            invalid: function(view, attr, error) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.addClass('has-error');
                if(group.find('.help-block').length == 0) {
                    control.after('<p class="help-block"></p>');
                }
                group.find('.help-block').text(error);
            }
        });
    }
});

