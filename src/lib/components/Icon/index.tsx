import React, { FC, ReactNode } from 'react';
import { Svg } from './styled';
import icons from './icons';

type Props = {
  name?: string;
  color?: string;
  size?: string;
  className?: string;
};

const Icon: FC<Props> = ({ name = 'default', color, size, className = '' }) => {
  const { d, width, group } = icons[name] || icons.default;
  let inner: ReactNode = <path d={d} />;
  if (group) inner = group;
  return (
    <Svg
      color={color}
      height={size}
      x='0px'
      y='0px'
      viewBox={`0 0 ${width} 512`}
      className={className}
    >
      {inner}
    </Svg>
  );
};

export default Icon;
