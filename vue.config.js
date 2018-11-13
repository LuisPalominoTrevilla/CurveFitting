module.exports = {
    devServer: {
        port: 5000,
        headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    },
    runtimeCompiler: true,
    baseUrl: 'http://localhost:5000/'
}