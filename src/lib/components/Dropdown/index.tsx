import React, {
  FunctionComponent,
  ReactNode,
  ReactElement,
  Children
} from 'react';
import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';
import Icon from '../Icon';
import Button from '../Button';
import Dropbox from '../Dropbox';

interface Props {
  label?: string;
  children?: ReactElement[];
  renderButton?: (props: any) => ReactNode;
}

interface FC<P> extends FunctionComponent<P> {
  Option: FunctionComponent<OptionProps>;
}

const Dropdown: FC<Props> = ({ label, children, renderButton }) => {
  const renderTarget = ({ show }) =>
    renderButton ? (
      renderButton(show)
    ) : (
      <Button onClick={show}>
        {label ? label : <Icon name='caret' size='5px' />}
      </Button>
    );

  const renderDropdown = ({ close }) => (
    <div onClick={close}>{children && Children.toArray(children)}</div>
  );
  return (
    <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
  );
};

interface OptionProps {
  label?: string;
  onClick?: () => void;
}

Dropdown.Option = ({ label, onClick = () => null }: OptionProps) => {
  return (
    <Item onClick={onClick} key={label}>
      {label}
    </Item>
  );
};

export default Dropdown;

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
