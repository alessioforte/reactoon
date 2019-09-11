import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from './styled';
import icons from './icons';

const Icon = ({ name, color, size }) => {
  if (!icons[name]) {
    console.error(`
    <Icon name='${name}' ... />
    '${name}' icon name is not defined in icons object try:
    ${Object.keys(icons).join(', ')}
    `);
  }
  const { d, width } = icons[name] || icons.default;
  return (
    <Svg
      color={color}
      height={size}
      x='0px'
      y='0px'
      viewBox={`0 0 ${width} 512`}
    >
      <path d={d} />
    </Svg>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string
};

Icon.defaultProps = {
  color: '#DADEE1',
  size: '30px'
};

export default Icon;
