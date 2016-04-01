var config = require('./webpack.base.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.output = {
	path: './dist',
	filename: '[name].js'
},
config.plugins = [
	new HtmlWebpackPlugin({  
	    filename: 'index.html',
	    template: 'src/index_prod.html',
	    inject: false
    })
]

module.exports = config