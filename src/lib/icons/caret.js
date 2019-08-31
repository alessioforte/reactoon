import React from 'react';
import { Svg } from './styled';

export default props => (
  <Svg
    color={props.color}
    width={props.size || 30}
    rotate={props.rotate || 0}
    x='0px'
    y='0px'
    viewBox='0 0 900 512'
  >
    <g>
      <path
        d='M405.4,493.6l-387-386.2c-24.6-24.6-24.6-64.4,0-89c24.6-24.6,64.5-24.6,89.1,0L450,360.2L792.4,18.4
                c24.6-24.6,64.5-24.6,89.1,0c24.6,24.6,24.6,64.4,0,89l-387,386.2C482.2,505.9,466.1,512,450,512
                C433.9,512,417.7,505.9,405.4,493.6z'
      />
    </g>
  </Svg>
);
