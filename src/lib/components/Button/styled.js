import styled, { css } from 'styled-components';
import { getContrastYIQ } from '../../theme';

const buttonStyles = css`
  height: ${props => props.height || '30px'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.25em 2em;
  min-width: 200px;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  outline: 0;
  font-size: 12px;
  text-align: center;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
`;

export const STATUS = {
  primary: css`
    background: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  `,
  success: css`
    background: ${props => props.theme.colors.success};
    border: 2px solid ${props => props.theme.colors.success};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.success)]};
  `,
  error: css`
    background: ${props => props.theme.colors.error};
    border: 2px solid ${props => props.theme.colors.error};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.error)]};
  `,
  ghost: css`
    background: ${props => props.theme.colors.light};
    border: 2px solid ${props => props.theme.colors.idle};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.light)]};
  `,
  warning: css`
    background: ${props => props.theme.colors.warning};
    border: 2px solid ${props => props.theme.colors.warning};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.warning)]};
  `
};

export const StyledButton = styled.button`
  ${buttonStyles};
  ${props => STATUS[props.status]}
  &:disabled {
    background: ${props => props.theme.colors.disabled};
    border: 2px solid ${props => props.theme.colors.disabled};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.disabled)]};
    opacity: 0.5;
  }
`;

export const A = styled(StyledButton.withComponent('a'))``;

export const availableStatus = Object.keys(STATUS);
