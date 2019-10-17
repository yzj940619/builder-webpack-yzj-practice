const cssnano = require('cssnano');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');


const baseConfig = require('./webpack.base.js');

const prodConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'ignore-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          'ignore-loader',
        ],
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({ // css压缩
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        entry: 'https://cdn.bootcss.com/react/16.8.6/umd/react.production.min.js',
        global: 'React',
      }, {
        module: 'react-dom',
        entry: 'https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.production.min.js',
        global: 'ReactDOM',
      }],
    }),

  ],
  optimization: {
    splitChunks: {
      minSize: 0, // 低于该数值的引用包会进行打包
      cacheGroups: {
        commons: {
          name: 'commons', // 打包后的名称
          // chunks: 'async', //异步引入的库(默认)
          // chunks: 'initial', //同步引入的库
          chunks: 'all', // 所有
          minChunks: 2, // 大于等于该数值的引用的包会进行打包
        },
      },
    },
  },
};

module.exports = merge(baseConfig, prodConfig);
