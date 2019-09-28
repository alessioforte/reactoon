import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { styles } from '../../theme';
import Dropbox from '../Dropbox';
import Tag from '../Tag';
import { Target, Options, Option } from '../Styled';

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
      <Tag
        key={`${item}-${i}`}
        label={item.label}
        icon='delete'
        action={e => unselect(e, item)}
      />
    ));
  };

  const renderTarget = ({ show }) => (
    <Target onClick={show} isError={isError} tabIndex='0'>
      {state.selected.length > 0 ? (
        <div>{renderSelected()}</div>
      ) : (
        <div>{label}</div>
      )}
    </Target>
  );

  const renderDropdown = () => (
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
  theme: styles
};

export default withTheme(Multiselect);
