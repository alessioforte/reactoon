import React, { FC, Children } from 'react';
import PropTypes from 'prop-types';
import { withTheme, ThemeProvider } from 'styled-components';
import { styles } from '../../theme';
import { StyledButton, A, availableStatus } from './styled';

type Props = {
  status?: string,
  href?: string,
  children: React.ReactNode,
  text?: string,
  theme: any
}

const Button: FC<Props> = ({ status, href, children, theme, text, ...props }) => {
  let buttonStatus: string = status || 'primary';
  if (status && !availableStatus.includes(status)) buttonStatus = 'primary';

  let button = (
    <StyledButton {...props} status={buttonStatus}>
      {children ? Children.toArray(children) : text}
    </StyledButton>
  );
  if (href) {
    button = (
      <A {...props} href={href} status={buttonStatus}>
        {children ? Children.toArray(children) : text}
      </A>
    );
  }

  return <ThemeProvider theme={theme}>{button}</ThemeProvider>;
};

Button.propTypes = {
  status: PropTypes.oneOf(availableStatus),
  href: PropTypes.string,
  children: PropTypes.node,
  text: PropTypes.string,
  theme: PropTypes.object
};

Button.defaultProps = {
  status: 'primary',
  text: '',
  theme: styles
};

export default withTheme(Button);
