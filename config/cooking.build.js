var path = require('path');
var cooking = require('cooking');
var nodeExternals = require('webpack-node-externals');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

cooking.set({
    entry:{
        'cron.js':['babel-polyfill', './src/index.js'],
    },
    dist: './build',
    // production
    clean: true,
    format: 'cjs',
    minimize: true,
    chunk: false, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
    urlLoaderLimit: 204800,
    postcss: [
        // require('...')
    ],
    alias: {
        'src': path.join(__dirname, 'src'),
        'vue': 'vue/dist/vue.min',
        'frame': '@project/frame',
    },
    extractCSS: false,//'[name].[contenthash:7].css'
    externals: [{
        'frame':'@project/frame'
    }, nodeExternals()],
    extends: ['vue2','less']//lint
});


cooking.add('output.filename', 'atm.min.js');
cooking.add('loader.js.exclude', /node_modules/);
cooking.add('vue.preserveWhitespace', false);

var config=cooking.resolve();

config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;
