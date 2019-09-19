import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import Dropbox from '../Dropbox';
import Icon from '../Icon';
import { Target, Options, Option, Selected } from './styled';

const Multiselect = ({ placeholder, options, isError, onChange, theme }) => {
  const label = placeholder || 'select...';

  const [state, setState] = useState({
    values: [],
    selected: [],
    options
  });

  const select = (item, i) => {
    let selected = state.selected;
    let values = state.values;
    selected.push(item);
    values.push(item.value);
    options[i].selected = true;
    setState({ selected, values, options });
    onChange(values);
  };

  const unselect = (e, item) => {
    e.stopPropagation();
    let selected = state.selected.filter(s => s.value !== item.value);
    let values = state.values.filter(v => v !== item.value);
    let options = state.options.map(o => {
      if (o.value === item.value) {
        o.selected = false;
      }
      return o;
    });
    setState({ selected, values, options });
    onChange(values);
  };

  const renderSelected = () => {
    return state.selected.map((item, i) => (
      <div key={`${item}-${i}`}>
        {item.label}
        <div onClick={e => unselect(e, item)}>
          <Icon
            name='delete'
            size='8px'
            color={theme.colors[getContrastYIQ(theme.colors.primary)]}
            margin='0 0 0 8px'
          />
        </div>
      </div>
    ));
  };

  const renderTarget = ({ show }) => (
    <Target onClick={show} isError={isError} tabIndex='0'>
      {state.selected.length > 0 ? (
        <Selected>{renderSelected()}</Selected>
      ) : (
        <div>{label}</div>
      )}
    </Target>
  );

  const renderDropdown = ({ close }) => (
    <Options>
      {options &&
        options.map((option, i) => (
          <Option
            key={`${option.value}-${i}`}
            onClick={e => !option.selected && select(option, i)}
            selected={option.selected}
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

Multiselect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

Multiselect.defaultProps = {
  placeholder: 'select...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Multiselect);
