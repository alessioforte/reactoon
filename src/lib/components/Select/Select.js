import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Theme from '../../theme';
import Dropbox from '../Dropbox';
import Icon from '../Icon';
import { Target, Options, Option } from '../Styled';

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
    <Target onClick={show} isError={isError} value={state.value} tabIndex='0'>
      {state.label}
      <div className='icon'>
        <Icon name='caret' size='5px' color={theme.colors.ground} />
      </div>
    </Target>
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
