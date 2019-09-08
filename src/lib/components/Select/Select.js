import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import Dropbox from '../Dropbox';
import Icon from '../Icon';

const Select = ({ placeholder, options, isError, onChange, theme }) => {
  const [state, setState] = useState({
    label: placeholder || 'select...',
    value: null
  });

  const select = (item, callback) => {
    const { label, value } = item;
    setState({ label, value });
    onChange(item.value);
    callback();
  };

  const renderTarget = ({ show }) => (
    <Input onClick={show} isError={isError} value={state.value} tabIndex='0'>
      {state.label}
      <div className='icon'>
        <Icon name='caret' size='5px' color={theme.colors.ground} />
      </div>
    </Input>
  );
  const renderDropdown = ({ close }) => (
    <Options>
      {options &&
        options.map(option => (
          <Option
            key={`${option.value}`}
            onClick={e => select(option, close)}
            selected={state.label === option.label}
          >
            {option.label}
          </Option>
        ))}
    </Options>
  );
  return (
    <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
  );
};

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  placeholder: 'select...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Select);

// prettier-ignore
const Input = styled.div`
  border-radius: ${props => props.theme.border.radius + 'px'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  width: auto;
  min-height: 30px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  border: 1px solid
    ${props =>
      props.isError ? props.theme.colors.error : props.theme.colors.background};
  color: ${props =>
    props.value
      ? props.theme.colors[getContrastYIQ(props.theme.colors.background)]
      : props.theme.colors.ground};
  padding: 0 10px;
  &:hover {
    border-color: ${props => props.theme.colors.ground};
  }
  &:focus {
    outline-color: ${props => props.theme.colors.focus};
  }
  .icon {
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
const Options = styled.div`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column' : 'column-reverse')};
  order: ${props => (props.reverse ? '0' : '-1')};
  /* overflow: scroll; */
`;
const Option = styled.li`
  background: ${props =>
    props.selected ? props.theme.colors.ground : 'transparent'};
  color: ${props =>
    props.selected
      ? props.theme.colors[getContrastYIQ(props.theme.colors.ground)]
      : props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  display: flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  list-style-type: none;
  margin: 0;
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.hover)]};
    cursor: default;
  }
`;
