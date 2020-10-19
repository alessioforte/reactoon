import { css } from 'styled-components';

export const focus = css`
  outline: none;
  box-shadow: inset 0 0 0 1pt ${props => props.theme.colors.focus};
`;
