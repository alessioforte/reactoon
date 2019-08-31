/**
 * Default Theme
 */

const COLORS = {
    primary: '#ffff00',
    secondary: '#DAA520',
    action: '',
    success: '#00FA9A',
    warning: '#FFA500',
    danger: '#B22222',
    error: '#B22222',
    info: '#00BFFF',
    light: '#fff',
    dark: '#1a1a1a',
    text: '#fff',
    textLight: '#ffffff',
    textDark: '#000000',
    textIdle: '',
    textActive: '',
    textError: '',
    groundzero: '#EFEFEF',
    background: '#eee',
    flatground: '#D3D3D3',
    ground: '#B5B5B5',
    hillground: '#848484',
    highground: '#3A3A3A',
    active: '#FFD700',
    selected: '#999',
    hover: '#2182BD',
    idle: '#888',
    disabled: '#778899',
    focus: 'none',
    holiday: '#FF4365',
    shadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.2)'
}

const BORDERS = {
    radius: 0
}

const SIZE = {
  is: 'xs',
  xs: {
    height: ''
  },
  sm: {},
  md: {},
  lg: {},
  xl: {}
}

export const styles = {
    colors: COLORS,
    borders: BORDERS,
    size: SIZE
}

export function create(theme) {
  let colors = COLORS
  let borders = BORDERS
  if (theme.colors) colors = { ...colors, ...theme.colors }
  if (theme.borders) borders = { ...borders, ...theme.borders }
  return {
    colors,
    borders
  }
}

export function getContrastYIQ(hexcolor) {
    if (typeof hexcolor !== 'string') throw new Error(`${hexcolor} is not a string`)
    if (hexcolor[0] !== '#') throw new Error(`${hexcolor} - HEX color not valid`)

    hexcolor = hexcolor.replace('#', '');

    if (hexcolor.length < 3) throw new Error(`${hexcolor} - HEX color not valid`)
    if (hexcolor.length === 3) hexcolor = hexcolor + hexcolor

    var r = parseInt(hexcolor.substr(0,2),16);
    var g = parseInt(hexcolor.substr(2,2),16);
    var b = parseInt(hexcolor.substr(4,2),16);

    var yiq = ((r*299)+(g*587)+(b*114))/1000;

    return (yiq >= 128) ? 'dark' : 'light';
}

export default {
    styles,
    getContrastYIQ,
    create
}
