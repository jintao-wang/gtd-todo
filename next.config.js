const withImages = require('next-images');

module.exports = withImages({
  inlineImageLimit: 16384,
  webpack(config, options) {
    if (!options.isServer) {
      // eslint-disable-next-line no-param-reassign
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
  trailingSlash: true,
});
