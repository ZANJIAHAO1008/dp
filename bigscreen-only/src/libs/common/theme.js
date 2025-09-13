const colorMap = {
  blue: '#397cbf', // 默认
  dark: '#22252a', // 黑夜
};

const updateTheme = (theme, noMsg) => {
  if (!colorMap[theme]) theme = 'blue';
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    });
  });
};

const updateColorWeak = colorWeak => {
  // document.body.className = colorWeak ? 'colorWeak' : '';
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak');
};

export { updateTheme, updateColorWeak };
