import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  Children
} from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Icon from '../Icon';
import Button from '../Button';
import { useDropdown } from '../../hooks';
import Theme from '../../theme';
import { getContrastYIQ } from '../../utils';
interface Props {
  label?: string;
  children?: ReactElement[];
  renderButton?: (props: any) => ReactNode;
  theme?: any;
}
interface OptionProps {
  label?: string;
  onClick?: () => void;
}

const Dropdown: FunctionComponent<Props> = ({
  label,
  children,
  renderButton,
  theme = Theme.styles
}) => {
  const { open, close, position, target, dropdown, visible } = useDropdown();

  const showDropdown = e => {
    e.stopPropagation();
    open();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box ref={target}>
        {renderButton ? (
          renderButton({ open })
        ) : (
          <Button onClick={showDropdown}>
            {label ? label : <Icon name='caret' size='5px' />}
          </Button>
        )}
        {visible && (
          <Drop position={position} ref={dropdown}>
            <div onClick={close}>{children && Children.toArray(children)}</div>
          </Drop>
        )}
      </Box>
    </ThemeProvider>
  );
};

interface FC<P> extends React.ForwardRefExoticComponent<P> {
  Option: FunctionComponent<OptionProps>;
}

const FREC: FC<Props> = withTheme(Dropdown) as FC<Props>;

FREC.Option = ({ label, onClick = () => null }: OptionProps) => {
  return (
    <Item onClick={onClick} key={label}>
      {label}
    </Item>
  );
};

export default FREC;

const Item = styled.div`
  margin: 0;
  min-height: 30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.hover)]};
    cursor: pointer;
  }
`;

const Box = styled.div<{ ref: any }>`
  position: relative;
  display: inline-block;
`;

const Drop = styled.div.attrs(({ position }: any) => ({ style: position }))<{
  ref: any;
  position: any;
}>`
  border-radius: ${props => `${props.theme.border.radius}px`};
  position: absolute;
  background: ${props => props.theme.colors.background};
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  margin: 5px 0;
  font-size: 12px;
  min-width: 200px;
  width: 100%;
  z-index: 9;
  &::-webkit-scrollbar {
    display: none;
  }
`;
