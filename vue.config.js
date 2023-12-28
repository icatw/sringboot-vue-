module.exports = {
  // ...
  transpileDependencies: ["vuetify"],
  lintOnSave: false,  // 关闭语法提示,
  devServer: {
    port: 8802
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "timers": require.resolve("timers-browserify")
      }
    }
  }
}
