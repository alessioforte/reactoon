/**
 * Default Theme
 */

const COLORS = {
  primary: '#ffff00',
  secondary: '#DAA520',
  success: '#00FA9A',
  warning: '#FFA500',
  danger: '#B22222',
  error: '#B22222',
  info: '#00BFFF',
  light: '#fff',
  dark: '#1a1a1a',
  // text: '#fff',
  // textLight: '#ffffff',
  // textDark: '#000000',
  // textIdle: '',
  // textActive: '',
  // textError: '',

  groundzero: '#EFEFEF',
  background: '#eee',
  flatground: '#D3D3D3',
  ground: '#B5B5B5',
  upperground: '#848484',
  higherground: '#3A3A3A',

  active: '#FFD700',
  selected: '#999',
  hover: '#2182BD',
  idle: '#888',
  disabled: '#778899',
  focus: '#61dafb',
  holiday: '#FF4365',
  shadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.2)'
};

const BORDER = {
  radius: 0,
  width: '1px'
};

const SIZE = {
  is: 'xs',
  xs: {
    height: '',
    font: ''
  },
  sm: {},
  md: {},
  lg: {},
  xl: {}
};

export const styles = {
  colors: COLORS,
  border: BORDER,
  size: SIZE
};

export function create(theme) {
  let colors = COLORS;
  let border = BORDER;
  if (theme.colors) colors = { ...colors, ...theme.colors };
  if (theme.border) border = { ...border, ...theme.border };
  return {
    colors,
    border
  };
}

export default {
  create,
  styles
};
