const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    host: 'localhost'
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "fs": false,
        "path": false,
        "crypto": false
      }
    }
  }
})
