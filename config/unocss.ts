// 原子样式 uno-css 支持
import { presetUno, presetAttributify, presetIcons } from 'unocss';
import UnoCss from 'unocss/vite';

const colors = [
  'white',
  'black',
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
];

const safelist = [
  // 安全列表 https://github.com/unocss/unocss
  ...colors.map(v => `bg-${v}-500`),
  ...colors.map(v => `hover:bg-${v}-700`),
  ...['search', 'edit', 'check', 'message', 'star-off', 'delete', 'add', 'share'].map(
    v => `i-ic-baseline-${v}`
  ),
];

export default () =>
  UnoCss({
    safelist,
    presets: [presetUno(), presetAttributify(), presetIcons()],
  });
