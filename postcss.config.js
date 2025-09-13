const px2remOpts = {
  rootValue: 100, // 换算的基数
  unitPrecision: 5, // 精确位数。
  propWhiteList: [], // 属性的白名单
  propBlackList: [], // 属性的黑名单
  exclude: false, // 默认false，可以用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  selectorBlackList: ['.not-rem'], // 要忽略并保留为px的选择器
  ignoreIdentifier: false, // Boolean/String，忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
  replace: true, // Boolean，替换包含REM的规则，而不是添加回退。
  mediaQuery: false, // Boolean，允许在媒体查询中转换px。
  minPixelValue: 0, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
};

module.exports = {
  plugins: {
    'postcss-plugin-px2rem': px2remOpts,
  },
};
