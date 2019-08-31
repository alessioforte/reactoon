import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withTheme, ThemeProvider } from 'styled-components';
import { styles } from '../../theme';
import { StyledButton, A, availableStatus } from './styled';

const Button = ({ status, href, children, theme, text, ...rest }) => {
  if (!availableStatus.includes(status)) {
    // eslint-disable-next-line no-console
    console.error(`
    <Button status='${status}' ... />
    '${status}' is not a valid status button try:
     ${availableStatus.join(', ')}
    `);
  }
  const buttonStatus = status || 'primary';

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
  status: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  text: PropTypes.string,
  theme: PropTypes.object
};

Button.defaultProps = {
  status: 'primary',
  text: '',
  theme: styles
};

export default withTheme(Button);
