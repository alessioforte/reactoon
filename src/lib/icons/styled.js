import styled from 'styled-components';

export const Svg = styled.svg`
  fill: ${props => props.color};
  width: ${props => props.width + 'px'};
  margin: ${props => props.margin || 0};
  transform: ${props => `rotate(${props.rotate || 0}deg)`};
`;
