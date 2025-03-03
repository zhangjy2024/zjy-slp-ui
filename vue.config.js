'use strict'

console.log("配置文件加载了")

module.exports = {
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
    }
  },
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 8080,
    open: false,
    hot: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      }
    },
    proxy: {
      '^/oauth2': {
        target: 'http://127.0.0.1:8081',
        headers: {
          "Authorization": "Basic Y2hpY2s6MTIzNDU2"
        },
        changeOrigin: true,
        logLevel: 'debug'
      },
      '^/api': {
        target: 'http://127.0.0.1:8081',
        changeOrigin: true,
        logLevel: 'debug'
      }
    }
  }
};