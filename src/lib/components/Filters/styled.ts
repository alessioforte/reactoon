import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';

/* eslint-disable */
export const Options = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column' : 'column-reverse')};
  order: ${props => (props.reverse ? '0' : '-2')};
  overflow: scroll;
  max-height: 338px;
  margin: 5px 0;
  padding-top: 10px;
`;
export const Content = styled(Options)`
  align-items: center;
  justify-content: center;
  min-height: 100px;
  padding: 1rem;
`;
export const Control = styled.div<{ reverse?: boolean; reset?: boolean }>`
  display: flex;
  justify-content: space-between;
  margin: 7px;
  min-height: 28px;
  order: ${props => (props.reverse ? '0' : '-1')};
  .button {
    padding: 0 5px;
    border: 1px solid ${props => props.theme.colors.idle};
    color: ${props => props.theme.colors.idle};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 20px;
    flex-shrink: 0;
    &:hover {
      cursor: pointer;
      border-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.primary};
    }
  }
  .reset {
    display: ${props => (props.reset ? 'flex' : 'none')};
  }
`;
export const Option = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  list-style-type: none;
  margin: 3px;
  background: ${props =>
    props.isSelected ? props.theme.colors.primary : props.theme.colors.ground};
  color: ${props =>
    props.isSelected
      ? props.theme.colors[getContrastYIQ(props.theme.colors.primary)]
      : props.theme.colors[getContrastYIQ(props.theme.colors.ground)]};
  border-radius: 3px;
  &:hover {
    color: ${props =>
      props.isSelected
        ? props.theme.colors[getContrastYIQ(props.theme.colors.primary)]
        : props.theme.colors[getContrastYIQ(props.theme.colors.ground)]};
    cursor: pointer;
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  }
`;
