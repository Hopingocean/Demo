var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    server_host: '"http://192.168.3.8/"'
        // server_host: '"http://plantform.qzygxt.com/"'
        // server_host: '"http://www.12h5.com/"'
})