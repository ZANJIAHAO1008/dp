const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  runtimeCompiler: true,
  lintOnSave: false,

  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },

  devServer: {
    port: 8080,
    open: true,
    proxy: {
      '/api/dp': {
        // target: "http://192.168.52.188:7080",
        // target: 'http://127.0.0.1:1903/api/dp',
        // target: 'http://172.27.2.28:1903',
        target: 'http://8.152.202.93:4848/api/dp',
        pathRewrite: { '^/api/dp': '/' },
        changeOrigin: true,
      },
    },
  },
};
