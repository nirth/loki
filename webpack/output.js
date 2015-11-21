const path = require('path');

module.exports = (dist) => ({
  path: path.join(__dirname, dist),
  filename: 'app.js',
  publicPath: '/'
});
