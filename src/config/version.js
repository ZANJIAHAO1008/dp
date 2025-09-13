// 版本及版本日志信息
const packageJson = require('./../../package.json');

const { configOut = {} } = window;

export const name = packageJson.name;

export const version = packageJson.version;

export const versionLog = [
  {
    title: `${configOut.title} 版本 2.0.0`,
    time: '2020/03/11',
    content: ['屏幕大小自适应', 'UI及交互优化', '单点登录优化'],
  },
  {
    title: `${configOut.title} 版本 1.0.0`,
    time: '2019/03/29',
    content: ['统一主题颜色', '统一页头页脚', 'logo及标题可配置', '代码优化', 'BUG修复'],
  },
];
