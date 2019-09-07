import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withTheme, ThemeProvider } from 'styled-components';
import { styles } from '../../theme';
import { StyledButton, A, availableStatus } from './styled';

const Button = ({ status, href, children, theme, text, ...rest }) => {
  let buttonStatus = status;
  if (!availableStatus.includes(status)) buttonStatus = 'primary';

  let button = (
    <StyledButton {...rest} status={buttonStatus}>
      {children ? Children.toArray(children) : text}
    </StyledButton>
  );
  if (href) {
    button = (
      <A {...rest} href={href} status={buttonStatus}>
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
