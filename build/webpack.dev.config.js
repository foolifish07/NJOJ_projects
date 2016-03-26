var config = require('./webpack.base.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.output = {
	path: './dist',
	filename: '[name].[hash].js'
},
config.plugins = [
	new HtmlWebpackPlugin({  
	    filename: 'index.html',
	    template: 'src/index_dev.html',
	    inject: 'body' 
    })
]
config.devtool = 'eval-source-map'

module.exports = config