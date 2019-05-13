module.exports = {
    outputDir: 'dist',
    runtimeCompiler: true,
    devServer: {
        // open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: {
            '/api': {
                target: `${process.env.VUE_APP_URL}`,   //代理接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''    //代理的路径
                }
            }
        }
    }
}
