const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')


const buildWebpackConfig = merge(baseWebpackConfig, {
   //Build settings
    mode: 'production',
    
    plugins: []
})

//export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
    resolve(buildWebpackConfig)
})