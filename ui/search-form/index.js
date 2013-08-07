var View = require('ribcage-view')
  , Button = require('../button/')

var SearchForm = View.extend({
  template: require('./search-form.html.hbs')
, className: 'search-form'
, context: function () {
    return {
      label: this.options.label || 'Search'
    }
  }
, afterRender: function () {
    var self = this
      , button = new Button({
          value: 'search'
        , action: function () {
            self.trigger('search')
          }
        })
    this.appendSubview(button)
  }
});

module.exports = SearchForm
