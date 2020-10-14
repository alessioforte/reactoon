import { Theme } from './lib';

const theme = Theme.create({
  colors: {
    primary: '#1FA588',
    secondary: '#86C5E0',
    action: '#F7AC91',
    active: '#FFE1C4',
    selected: '#008080',
    hover: '#1FA588',
    success: '#00FA9A',
    warning: '#FFA500',
    danger: '#B22222',
    error: '#B22222',
    info: '#00BFFF',
    light: '#fff',
    dark: '#1a1a1a',
    // text: 'red',
    // textLight: '#ffffff',
    // textDark: '#000000',
    // textIdle: '',
    // textActive: '',
    // textError: '',
    groundzero: '#FFFFFF',
    background: '#bbb',
    flatground: '#ccc',
    ground: '#eee',
    upperground: '#707070',
    higherground: '#303030',
    idle: '#eee',
    disabled: '#778899',
    focus: '#61dafb',
    holiday: '#FF4365',
    shadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.2)'
  },
  border: {
    radius: 5
  }
});

export default theme;
