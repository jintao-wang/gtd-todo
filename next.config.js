module.exports = {
  webpack: (config, {
    buildId, dev, isServer, defaultLoaders, webpack,
  }) => {
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.target = 'electron-renderer';
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
};
