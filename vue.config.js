'use strict'
const { error } = require('console')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8080

module.exports = {
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
    },
  },
  lintOnSave: false,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    port: port,
    open: false,
    hot: true,
    client: {
      overlay: {
        errors: false,
        warnings: false,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/oauth': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/oauth': '/oauth',
        },
      },
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
};