var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: '#form_view',
    ui: {
        inputCategory:'input.category',
        inputComment:'input.comment',
        inputs:'input'
    },
    events: {
        'click .create-comment-btn': 'onClickCreate'
    },
    onClickCreate: function() {
        var inputCategory = this.ui.inputCategory.val().trim();
        var inputComment = this.ui.inputComment.val().trim();
        this.collection.create({
            category: inputCategory,
            content: inputComment
        });
        this.ui.inputs.val('');
    }
});
