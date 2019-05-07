module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/newsletter_generator/'
    : '/',
  chainWebpack: config => {
    config.module.rule('images').use('url-loader')
        .loader('file-loader') // replaces the url-loader
        .tap(options => Object.assign(options, {
          name: 'images/[name].[ext]'
        }))
  }
}