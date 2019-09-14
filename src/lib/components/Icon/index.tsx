import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Svg } from './styled';
import icons from './icons';

const availableIcons = Object.keys(icons)

type Props = {
  name?: string,
  color?: string,
  size?: string,
}

const Icon: FC<Props> = ({ name = 'default', color, size }) => {
  const { d, width, children } = icons[name] || icons.default;
  return (
    <Svg
      color={color}
      height={size}
      x='0px'
      y='0px'
      viewBox={`0 0 ${width} 512`}
    >
      {children ? children : <path d={d} /> }
    </Svg>
  );
};

Icon.propTypes = {
  name: PropTypes.oneOf(availableIcons).isRequired,
  color: PropTypes.string,
  size: PropTypes.string
};

Icon.defaultProps = {
  name: 'default',
  color: '#DADEE1',
  size: '30px'
};

export default Icon;
