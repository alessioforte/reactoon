import React, { FC, Children, ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { withTheme, ThemeProvider } from 'styled-components';
import { styles } from '../../theme';
import { StyledButton, A, IconWrapper, availableStatus } from './styled';
import Icon from '../Icon'
import { availableIcons } from '../Icon/icons'

type Props = {
  status?: string,
  href?: string,
  children: React.ReactNode,
  text?: string,
  icon?: string,
  reverse?: boolean,
  theme: any,
}

const Button: FC<Props> = ({ status, href, children, theme, text, icon, reverse, ...props }) => {
  let buttonStatus: string = status || 'primary';
  if (status && !availableStatus.includes(status)) buttonStatus = 'primary';

  let inner: ReactNode = children ? Children.toArray(children) : text

  if (icon && availableIcons.includes(icon)) {
    inner = (
      <>
        <IconWrapper reverse={reverse}>
          <Icon name={icon} size='1rem' />
        </IconWrapper>
        {text}
      </>
    )
  }

  let button: ReactElement = (
    <StyledButton {...props} status={buttonStatus} reverse={reverse}>
      {inner}
    </StyledButton>
  );

  if (href) {
    button = (
      <A {...props} href={href} status={buttonStatus} reverse={reverse}>
        {inner}
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
  icon: PropTypes.oneOf(availableIcons),
  reverse: PropTypes.bool,
  theme: PropTypes.object
};

Button.defaultProps = {
  status: 'primary',
  text: '',
  reverse: false,
  theme: styles
};

export default withTheme(Button);
