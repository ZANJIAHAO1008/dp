import { message } from 'chinaoly-ui-vue/es';

const colorMap = {
  blue: '#397cbf', // 默认
  dark: '#22252a', // 黑夜
};

const updateTheme = (theme, noMsg) => {
  if (!colorMap[theme]) theme = 'blue';
  const hideMessage = !noMsg && message.loading('正在切换主题！', 0);
  return new Promise(resolve => {
    setTimeout(() => {
      !noMsg && hideMessage();
      resolve();
    });
  });
};

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak');
};

export { updateTheme, updateColorWeak };
