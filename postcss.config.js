module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-sort-media-queries'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
}