import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';

/* eslint-disable */
export const Block = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
`;
export const Button = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  min-height: 30px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  border: 1px solid
    ${props =>
      props.isError ? props.theme.colors.error : props.theme.colors.background};
  color: ${props =>
    props.value ? props.theme.colors.text : props.theme.colors.idle};
  padding: 0 10px;
  &:hover {
    opacity: 0.8;
  }
`;
export const Drop = styled.div.attrs(({ position }) => ({ style: position }))`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.background};
  box-shadow: 0px 1px 30px 1px rgba(0, 0, 0, 0.2);
  font-size: 12px;
  z-index: 9;
`;
export const List = styled.div`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column' : 'column-reverse')};
  order: ${props => (props.reverse ? '0' : '-2')};
  overflow: scroll;
  max-height: 338px;
  margin: 5px 0;
  padding-top: 10px;
`;
export const Content = styled(List)`
  align-items: center;
  justify-content: center;
  min-height: 100px;
`;
export const Selected = styled.div`
  color: ${props =>
    props.isText
      ? props.theme.colors.idle
      : props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  flex-grow: 1;
  & > div {
    display: inline-block;
    background: ${props => props.theme.colors.primary};
    padding: 2px 5px;
    margin: 2px;
    border-radius: 3px;
    font-size: 12px;
    div {
      display: inline-block;
    }
  }
  svg:hover {
    cursor: pointer;
  }
`;
export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  padding: 0 10px;
`;
export const Placeholder = styled.div`
  color: ${props => props.theme.colors.idle};
`;
export const Icon = styled.div`
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
export const Control = styled.div`
  display: flex;
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
`;
export const Option = styled.div`
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
export const IsSelected = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 1px;
  background: ${props => props.theme.colors.primary};
`;
