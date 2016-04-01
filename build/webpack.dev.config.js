var config = require('./webpack.base.config.js')
var HtmlWebpackPlugin = require('html-webpack-plugin');

config.output = {
	path: './dist',
	filename: '[name].[hash].js',
};
config.devServer= {
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
    proxy: {
    	// http://0.0.0.0:8080/Contest/715/balloon_data/
    	'/data': {
	    	target: 'http://localhost:9999',
	        secure: false,
	        rewrite: function(req) {
		      	req.url = req.url.replace( /^\/data/, 'Contest/715/balloon/data/');
		    },
        },
    }
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