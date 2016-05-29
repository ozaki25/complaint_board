var Backbone = require('backbone');
Backbone.Marionette = require('backbone.marionette');

module.exports = Backbone.Marionette.ItemView.extend({
    template: '#alert_view',
    className: function() {
        var classNames = 'alert alert-dismissible ';
        switch(this.alertType) {
            case 'success':
                classNames += 'alert-success';
                break;
            case 'info':
                classNames += 'alert-info';
                break;
            case 'warning':
                classNames += 'alert-warning';
                break;
            case 'danger':
                classNames += 'alert-danger';
                break;
            default:
                classNames += 'alert-success';
                break;
        }
        return classNames;
    },
    initialize: function(options) {
        this.alertType = options.type;
        this.message = options.message;
    },
    templateHelpers: function() {
        return {
            message: this.message
        }
    }
});
