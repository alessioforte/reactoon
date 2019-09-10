import styled, { css } from 'styled-components';
import { getContrastYIQ, getColorLuminance } from '../../theme';

const buttonStyles = css`
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 1em;
  text-decoration: none;
  border-radius: 4px;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  border: 0;
`;

// prettier-ignore
export const STATUS: any = {
  primary: css`
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
    &:hover {
      background: ${props => getColorLuminance(props.theme.colors.primary, 0.1)};
    }
    svg {
      fill: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
    }
  `,
  success: css`
    background: ${props => props.theme.colors.success};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.success)]};
    &:hover {
      background: ${props => getColorLuminance(props.theme.colors.success, 0.1)};
    }
    svg {
      fill: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.success)]};
    }
  `,
  error: css`
    background: ${props => props.theme.colors.error};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.error)]};
    &:hover {
      background: ${props => getColorLuminance(props.theme.colors.error, 0.1)};
    }
    svg {
      fill: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.error)]};
    }
  `,
  danger: css`
    background: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.danger)]};
    &:hover {
      background: ${props => getColorLuminance(props.theme.colors.danger, 0.1)};
    }
    svg {
      fill: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.danger)]};
    }
  `,
  ghost: css`
    background: transparent;
    border: 2px solid ${props => props.theme.colors.idle};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.groundzero)]};
    svg {
      fill: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.groundzero)]};
    }
  `,
  warning: css`
    background: ${props => props.theme.colors.warning};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.warning)]};
    &:hover {
      background: ${props => getColorLuminance(props.theme.colors.warning, 0.1)};
    }
    svg {
      fill: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.warning)]};
    }
  `
};

// prettier-ignore
export const StyledButton = styled.button<{ status: string }>`
  ${buttonStyles};
  ${props => STATUS[props.status]}
  &:disabled {
    background: ${props => props.theme.colors.disabled};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.disabled)]};
    opacity: 0.5;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 2pt 1pt ${props => props.theme.colors.focus};
  }
`;

export const A = styled(StyledButton.withComponent('a'))``;

export const availableStatus = Object.keys(STATUS);
