var overlay = require('ios-overlay')
  , SearchForm  = require('./search-form/')

window.search = new SearchForm({
  label: 'Search this site:'
})

search.on('search', function () {

  var searchOverlay = overlay({text: 'searching'})

  setTimeout(function () {

    searchOverlay.update({text: 'Done'})

    setTimeout(function () {
      searchOverlay.hide()
    }, 300)

  }, 1000)
})

search.$el.appendTo('#search-target')
