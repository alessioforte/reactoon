import React, { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Svg } from './styled';
import icons, { availableIcons } from './icons';

type Props = {
  name?: string,
  color?: string,
  size?: string,
}

const Icon: FC<Props> = ({ name = 'default', color, size }) => {
  const { d, width, group } = icons[name] || icons.default;
  let inner: ReactNode = <path d={d} />
  if (group) inner = group
  return (
    <Svg
      color={color}
      height={size}
      x='0px'
      y='0px'
      viewBox={`0 0 ${width} 512`}
    >
      {inner}
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
  size: '1rem'
};

export default Icon;
