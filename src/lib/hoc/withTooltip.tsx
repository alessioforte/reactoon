import React from 'react';
import Tooltip from '../components/Tooltip';

export default function withTooltip(Component: React.FC): React.FC<any> {
  return props => {
    const { tooltip, ...rest } = props;
    return (
      <Tooltip content={tooltip || 'empty'}>
        <Component {...rest} />
      </Tooltip>
    );
  };
}
