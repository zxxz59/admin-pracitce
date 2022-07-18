const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 3030,
    proxy: {
      '/test': {
        target: 'http://liufusong.top:8899/api/private/v1/', // 跨域请求的地址
        changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
        // test 路径不需要只是以它为名，让后路径重写去掉
        pathRewrite: { '^/test': '' }
      }
    }
  }
})
