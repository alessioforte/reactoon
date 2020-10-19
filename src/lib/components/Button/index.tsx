import React, { FC, Children, ReactNode, ReactElement } from 'react';
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
  onClick?: () => void;
};

const Button: FC<Props> = ({
  kind = 'primary',
  href,
  children,
  label = '',
  icon,
  reverse = false,
  round = false,
  onClick = () => {},
  theme = styles,
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
      onClick={onClick}
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

export default withTheme(Button);
