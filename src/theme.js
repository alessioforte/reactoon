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
    text: 'red',
    textLight: '#ffffff',
    textDark: '#000000',
    textIdle: '',
    textActive: '',
    textError: '',
    groundzero: '#FFFFFF',
    background: '#F9F9F9',
    flatground: '#EAEAEA',
    ground: '#CCCCCC',
    hillground: '#707070',
    highground: '#303030',
    idle: '#eee',
    disabled: '#778899',
    focus: '#fafafa',
    holiday: '#FF4365',
    shadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.2)'
  },
  borders: {
    radius: 5
  }
});

export default theme;
