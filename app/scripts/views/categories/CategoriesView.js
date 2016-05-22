var $ = require('jquery');
var Validation = require('backbone.validation');
var Marionette = require('backbone.marionette');
var Category = require('../../models/Category');
var CategoryView = require('./CategoryView');

module.exports = Marionette.CompositeView.extend({
    className: 'container',
    childView: CategoryView,
    childViewContainer: '#show_categories',
    template: '#categories_main_view',
    ui: {
        inputName: 'input.category-name'
    },
    events: {
        'click .add-category': 'onClickAddCategory'
    },
    onClickAddCategory: function() {
        this.model = new Category();
        Validation.bind(this, {
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
                    group.find('.form-control').after('<p class=\'help-block\'></p>');
                }
                var target = group.find('.help-block');
                target.text(error);
            }
        });
        var name = this.ui.inputName.val().trim();
        this.model.set({name: name});
        if(this.model.isValid(true)) {
            this.collection.add(this.model);
            this.ui.inputName.val('');
        }
    }
});

