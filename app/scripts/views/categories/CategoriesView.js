var $ = require('jquery');
var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');
Backbone.Validation = require('backbone.validation');
var Category = require('../../models/Category');
var CategoryView = require('./CategoryView');

module.exports = Backbone.Marionette.CompositeView.extend({
    className: 'container',
    childView: CategoryView,
    childViewContainer: '#show_categories',
    template: '#categories_main_view',
    ui: {
        inputName: 'input.category-name',
        createBtn: '.create-category-btn'
    },
    events: {
        'keypress': 'preventSubmit',
        'keypress @ui.createBtn': 'onKeypressCreate',
        'click @ui.createBtn': 'onClickCreate'
    },
    preventSubmit: function(e) {
        var enter = 13;
        if(e.which === enter) e.preventDefault();
    },
    onKeypressCreate: function(e) {
        var enter = 13;
        if(e.which === enter) this.createCategory();
    },
    onClickCreate: function() {
        this.createCategory();
    },
    createCategory: function() {
        this.model = new Category();
        this.bindBackboneValidation();

        var name = this.ui.inputName.val().trim();
        this.model.set({name: name});
        if(this.model.isValid(true)) {
            this.collection.create(this.model);
            this.ui.inputName.val('');
        }
    },
    bindBackboneValidation: function() {
        Backbone.Validation.bind(this, {
            valid: function(view, attr) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.removeClass('has-error');
                group.find('.help-block').remove();
            },
            invalid: function(view, attr, error) {
                var control = view.$('[name=' + attr + ']');
                var group = control.closest('.form-group');
                group.addClass('has-error');
                if(group.find('.help-block').length == 0) {
                    control.after('<p class=\'help-block\'></p>');
                }
                var target = group.find('.help-block');
                target.text(error);
            }
        });
    }
});

