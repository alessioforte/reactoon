import { css } from 'styled-components';

export const focus = css`
  outline: none;
  box-shadow: 0 0 0 1pt ${props => props.theme.colors.focus};
`;
