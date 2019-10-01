import styled from 'styled-components'
import { KnobProps } from './interfaces'
import { focus } from '../Styled/css'

export const Block = styled.div`
  display: inline-block;
`
export const Knob = styled.div<KnobProps>`
  flex-shrink: 0;
  position: relative;
  height: 20px;
  width: 40px;
  border-radius: 20px;
  position: relative;
  background: ${props => props.theme.colors.background};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    ${focus}
  }
  &:after {
    content: '';
    height: 16px;
    width: 16px;
    background: ${props =>
      props.active ? props.theme.colors.primary : props.theme.colors.ground};
    left: ${props => props.active ? '20px' : '0'};
    border-radius: 50%;
    position: absolute;
    margin: 2px;
    transition: all 0.3s ease;
  }
`;
export const Label = styled.div`
  display: inline-block;
  margin-left: 5px;
`;
