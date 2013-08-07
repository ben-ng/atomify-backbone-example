var _ = require('lodash')
  , View = require('ribcage-view')

var Button = View.extend({

  tagName: 'button'

, afterInit: function () {
    this.action = this.options.action || function () {};
    this.value = this.options.value || 'submit';
  }

, afterRender: function () {
    this.$el.text(this.value);
  }

, events: {
    'click': 'action'
  }

});

module.exports = Button
