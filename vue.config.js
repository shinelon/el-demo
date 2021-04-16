
module.exports = {
    devServer: {
        open: true, // auto open brower 项目启动后自动打开浏览器...
        disableHostCheck: false,
        host: "0.0.0.0",
        port: 8888, // 修改端口号
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: {     // string | Object 解决跨域问题
            '/api': {
                target: 'http://localhost:8081/kcall', // 对应自己的 跨域地址 即请求的后端地址
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
