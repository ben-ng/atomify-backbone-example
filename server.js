var http = require('http')
  , atomify = require('atomify')
  , st = require('st')
  , mount = st({ path: __dirname + '/static', url: '/static' })
  , fs = require('fs')
  , path = require('path')

var cssVariables = {
  lightBG: '#fdf6e3'
, darkBG: '#eee8d5'
, textColor: '#657b83'
, headerColor: '#859900'
, linkColor: '#b58900'
}

var atom = atomify({
  js: {
    entry: path.join(__dirname, 'ui', 'entry.js')
  , shim: {
      jquery: { path: __dirname + '/static/js/jquery.js', exports: '$' }
    }
  , debug: true
  , file: '/bundle.js'
  , map: '/bundle.map'
  , compressPaths: function (p) { return path.relative(__dirname, p) }
  }
, css: {
    entry: './ui/entry.css'
  , variables: cssVariables
  }
});

http.createServer(function(req, res) {
  var stHandled = mount(req, res)
  if (stHandled) { return }
  else {
    if (req.url == '/bundle.js') atom.js(req, res)
    else if (req.url == '/bundle.css') atom.css(req, res)
    else if (req.url == '/bundle.map') atom.map(req, res)
    else if (req.url == '/') {
      var s = fs.createReadStream(__dirname + '/index.html')
      s.on('open', function () {
        s.pipe(res)
      })
    }
    else res.end('this is not a static file')
  }
}).listen(3000)
