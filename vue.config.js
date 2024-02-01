module.exports = {
    configureWebpack: {
        module: {
            rules: [
                { test: /node_modules[\\/]@metamask/, loader: 'babel-loader' },
                { test: /node_modules[\\/]@web3modal/, loader: 'babel-loader' },
                { test: /node_modules[\\/]@web3-onboard/, loader: 'babel-loader' },
                { test: /node_modules[\\/]@walletconnect/, loader: 'babel-loader' },
            ],
        }
    },
}
