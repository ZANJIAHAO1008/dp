const path = require('path');
const { getBuildParams, writeInfo } = require('@co/build-log');
const { name, version } = require('./package.json');

const CompressionWebpackPlugin = require('compression-webpack-plugin'); // gzip压缩
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production';
const publicPath = getBuildParams('publicPath');
console.log('publicPath----', publicPath);

function resolve(dir) {
  return path.join(__dirname, dir);
}

const vueConfig = {
  // 自定义webpack配置
  configureWebpack: {
    devtool: 'eval-source-map',
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      fallback: { crypto: false },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
    plugins: [],
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendorUI: {
            chunks: 'all',
            name: false, // 单独将 UI组件 拆包
            priority: 20, // 权重需大于其它缓存组
            test: /[\\/]node_modules[\\/](chinaoly-ui-vue|chinaoly-business-vue)[\\/]/,
          },
          vendorOther: {
            chunks: 'all',
            priority: 19,
            test: /[\\/]node_modules[\\/](@ant-design|moment)[\\/]/,
          },
        },
      },
    },
  },
};

if (isProd) {
  vueConfig.configureWebpack.devtool = false;
  vueConfig.configureWebpack.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip', // 使用gzip压缩
      test: new RegExp(
        '\\.(js|css)$' // 压缩 js 与 css
      ),
      threshold: 10240, // 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8, // 最小压缩比达到0.8时才会被压缩
      deleteOriginalAssets: false, // 是否删除原文件
    })
  );
  // 生成构建日志
  writeInfo('dist/info.json', { version });
}
if (process.env.npm_config_report) {
  vueConfig.configureWebpack.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath,
  outputDir: 'dist',
  assetsDir: 'dist',
  filenameHashing: true,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // less vars，customize ant design theme
            // 'primary-color': '#F5222D',
            // 'link-color': '#F5222D',
          },
          // DO NOT REMOVE THIS LINE
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap(args => {
      args[0].exclude = 'configOut.js'; // 不压缩指定文件
      return args;
    });
    config.plugin('html').tap(args => {
      args[0].inject = 'body'; // 打包后的依赖文件引入放置在body内
      args[0].minify = false; // 不压缩
      return args;
    });
    const svgRule = config.module.rule('svg');
    // 清除已有的所有 loader。如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule
      .test(/\.(svg)(\?.*)?$/)
      .include.add(path.resolve(__dirname, './src/images/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader');
    const fileRule = config.module.rule('file');
    fileRule.uses.clear();
    fileRule
      .test(/\.(svg)(\?.*)?$/)
      .exclude.add(path.resolve(__dirname, './src/images/svg'))
      .end()
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'dist/img/[name].[hash:8].[ext]',
        esModule: false,
      });
    const types = ['cye-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach(type => {
      let lessRule = config.module.rule('less').oneOf(type);
      lessRule
        .use('style-resources')
        .loader('style-resources-loader')
        .options({
          patterns: path.resolve(__dirname, './src/styles/vars.less'),
        });
    });
  },
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  devServer: {
    port: 8888,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      //匹配代理的url
      '/api/login': {
        // target: 'http://172.16.100.119:7188',
        target: 'http://172.27.0.50:7081',
        // 路径重写
        pathRewrite: { '^/api/login': '/' },
        changeOrigin: true,
      },
      // 系统管理
      '/api/xtgl': {
        // target: "http://192.168.52.188:7080",
        target: 'http://172.27.0.50:7080',
        pathRewrite: { '^/api/xtgl': '/' },
        changeOrigin: true,
      },
      // 大屏
      '/api/dp': {
        // target: "http://192.168.52.188:7080",
        // target: 'http://127.0.0.1:1903/api/dp',
        // target: 'http://172.27.2.28:1903',
        target: 'http://8.152.202.93:4848/api/dp',
        pathRewrite: { '^/api/dp': '/' },
        changeOrigin: true,
      },
      // 基础管控
      '/api/fkmgr': {
        // 开发
        target: 'http://172.27.0.21:8080/fk-mgr',
        // target: 'http://172.27.0.24:8088/fk-mgr',
        // target: 'http://172.27.1.47:8080/fk-mgr',
        pathRewrite: {
          '^/api/fkmgr': '/',
        },
      },
    },
  },
  ...vueConfig,
  lintOnSave: false,
};
