module.exports = {
  devServer: {
    host: 'app.laravel.test'
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Uptime Monitoring Service',
    },
  },
}