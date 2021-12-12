const path = require('path');
const { override, disableChunk } = require('customize-cra');

module.exports = {
  webpack: function(config, env) {
    config.entry = {
      main: [path.resolve('src/index')],
    };
    config.output.filename = 'static/js/[name].js';
    // config.output.publicPath = '/options/build/';

    return override(disableChunk())(config, env);
  },
};
