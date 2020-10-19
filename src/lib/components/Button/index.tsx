import React, { FC, Children, ReactNode, ReactElement } from 'react';
import PropTypes from 'prop-types';
import { withTheme, ThemeProvider } from 'styled-components';
import { styles } from '../../theme';
import { StyledButton, A, availableKinds, Group } from './styled';
import Icon from '../Icon';
import { availableIcons } from '../Icon/icons';

type Props = {
  kind?: string;
  href?: string;
  children?: ReactNode;
  label?: string;
  icon?: string;
  reverse?: boolean;
  round?: boolean;
  theme: any;
  onClick?: () => {};
};

const Button: FC<Props> = ({
  kind,
  href,
  children,
  theme,
  label,
  icon,
  reverse,
  round,
  onClick,
  ...props
}) => {
  let buttonKinds: string = kind || 'primary';
  if (kind && !availableKinds.includes(kind)) buttonKinds = 'primary';

  let inner: ReactNode = children ? Children.toArray(children) : label;

  if (icon && availableIcons.includes(icon)) {
    inner = (
      <>
        <span>
          <Icon name={icon} />
        </span>
        {label}
      </>
    );
  }

  let button: ReactElement = (
    <StyledButton
      {...props}
      kind={buttonKinds}
      reverse={reverse}
      round={round}
      hasLabel={label !== '' || children !== undefined}
    >
      {inner}
    </StyledButton>
  );

  if (href) {
    button = (
      <A
        {...props}
        href={href}
        kind={buttonKinds}
        reverse={reverse}
        round={round}
        hasLabel={label !== '' || children !== undefined}
      >
        {inner}
      </A>
    );
  }

  return <ThemeProvider theme={theme}>{button}</ThemeProvider>;
};

export const ButtonGroup: FC<{ children?: ReactNode }> = ({ children }) => {
  return <Group>{Children.toArray(children)}</Group>;
};

Button.propTypes = {
  kind: PropTypes.oneOf(availableKinds),
  href: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
  icon: PropTypes.oneOf(availableIcons),
  reverse: PropTypes.bool,
  round: PropTypes.bool,
  theme: PropTypes.object
};

Button.defaultProps = {
  kind: 'primary',
  label: '',
  reverse: false,
  round: false,
  theme: styles
};

export default withTheme(Button);
