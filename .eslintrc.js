const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  root: true,
  globals: {
    configOut: true,
    SetToken: true,
  },
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': isProd ? ['warn', { allow: ['error', 'warn', 'info'] }] : 'off',
    'no-debugger': isProd ? 'warn' : 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'none' }], // 检查所有声明，不检查参数
    'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true }], // 函数最大行数
    quotes: ['error', 'single'], // 使用单引号
    semi: ['error', 'always'], // 行尾加分号
    eqeqeq: ['error', 'always'], // 只能用 === 或 !==
    'array-bracket-spacing': ['error'], // 数组的空格
    'space-infix-ops': ['error'], // 操作符的空格
    'space-before-blocks': ['error'], // 代码块的空格
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }], // function的左括号之前使用一致的空格
    'no-setter-return': 2, // setter 不允许有返回值
    'consistent-return': 2, // 要求 return 语句要么总是指定返回的值，要么不返回
    'default-case': 2, // 要求 switch 语句中有 default 分支
    'vue/script-setup-uses-vars': 'off',
    'vue/no-mutating-props': 'warn',
  },
};
