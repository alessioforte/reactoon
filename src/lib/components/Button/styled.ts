import styled, { css } from 'styled-components';
import { getContrastYIQ, getColorLuminance } from '../../theme';
import { focus } from '../Styled/css'

const buttonStyles = css`
  min-height: 30px;
  min-width: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  border: 0;
`;

// prettier-ignore
export const KINDS: any = {
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

type StyledButtonProps = {
  kind: string,
  reverse?: boolean,
  round?: boolean,
  hasLabel?: boolean
}

// prettier-ignore
export const StyledButton = styled.button<StyledButtonProps>`
  ${buttonStyles};
  ${props => KINDS[props.kind]};
  ${props => props.reverse && `flex-direction: row-reverse;`};
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: ${props => props.reverse ?
      `0 0 0 1rem;` :
      `0 ${props.round || !props.hasLabel ? '0' : '1rem'} 0 0;`
    };
  }
  ${props => props.round ? `border-radius:50%;` : `
    border-radius: ${props.theme.border.radius}px;
    padding: 0 ${props.hasLabel ? '0.9em' : '0'};
    `};
  &:disabled {
    background: ${props => props.theme.colors.disabled};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.disabled)]};
    opacity: 0.5;
  }
  &:focus {
    ${focus}
  }
`;

export const A = styled(StyledButton.withComponent('a'))``;

export const availableKinds = Object.keys(KINDS);

export const Group = styled.div`
  display: inline-flex;
  border-radius: ${props => props.theme.border.radius}px;
  * {
    border-radius: 0;
  }
  & > * > button,
  & > button {
    border-right: 1px solid rgba(255,255,255,0.2);
  }
  & > *:first-child,
  & > *:first-child > button {
    border-radius: ${props => `${props.theme.border.radius}px 0 0 ${props.theme.border.radius}px`};
  }
  & > *:last-child,
  & > *:last-child > button {
    border-right: 0;
    border-radius: ${props => `0 ${props.theme.border.radius}px ${props.theme.border.radius}px 0`};
  }
`

