const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
 lintOnSave:false,
//  proxy代理,解决跨域问题
devServer: {
  proxy: {
    '/api': {
      target: 'http://39.98.123.211',
      // 不用重写
      // pathRewrite: { '^/api': '' },
    },
  },
},
})
