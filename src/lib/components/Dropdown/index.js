import React from 'react';
import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';
import Icon from '../Icon';
import Button from '../Button';
import Dropbox from '../Dropbox';

const Dropdown = ({ placeholder, children, renderButton }) => {
  const renderTarget = ({ show }) => renderButton ? renderButton(show) : (
    <Button onClick={show}>
      {placeholder ? placeholder : <Icon name='caret' size='5px' />}
    </Button>
  )

  const renderDropdown = ({ close }) => (
    <div onClick={close}>{children && children.map(child => child)}</div>
  );
  return (
    <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
  );
};

const Option = ({ label, action }) => {
  return (
    <Item onClick={action} key={label}>
      {label}
    </Item>
  );
};

Dropdown.Option = Option;

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
