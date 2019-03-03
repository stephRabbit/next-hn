const SWPrecacheWebPackPlugin = require('sw-precache-webpack-plugin')

module.exports = {
  webpack: config => {
    config.plugins.push(
      new SWPrecacheWebPackPlugin({
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/
          }
        ]
      })
    )

    return config
  }
}