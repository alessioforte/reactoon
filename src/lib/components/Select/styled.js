import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';
import { focus } from '../Styled/css';

export const Target = styled.div`
  border-radius: ${props => props.theme.border.radius + 'px'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  width: auto;
  min-height: 30px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  border: 1px solid
    ${props =>
      props.isError ? props.theme.colors.error : props.theme.colors.background};
  color: ${props =>
    props.value
      ? props.theme.colors[getContrastYIQ(props.theme.colors.background)]
      : props.theme.colors.ground};
  padding: 0 10px;
  &:hover {
    border-color: ${props => props.theme.colors.ground};
  }
  &:focus {
    ${focus}
  }
  .icon {
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column' : 'column-reverse')};
  order: ${props => (props.reverse ? '0' : '-1')};
  /* overflow: scroll; */
`;

export const Option = styled.li`
  background: ${props =>
    props.selected ? props.theme.colors.ground : 'transparent'};
  color: ${props =>
    props.selected
      ? props.theme.colors[getContrastYIQ(props.theme.colors.ground)]
      : props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  display: flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  list-style-type: none;
  margin: 0;
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.hover)]};
    cursor: default;
  }
`;

export const Selected = styled.div`
  color: ${props =>
    props.isText
      ? props.theme.colors.idle
      : props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  & > div {
    display: inline-block;
    background: ${props => props.theme.colors.primary};
    padding: 3px 6px;
    margin: 1px;
    border-radius: 3px;
    div {
      display: inline-block;
      margin-left: 10px;
    }
  }
  svg:hover {
    cursor: pointer;
  }
`;
