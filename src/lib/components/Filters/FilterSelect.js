import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Dropbox from '../Dropbox';
import Theme, { getContrastYIQ } from '../../theme';
import { Delete } from '../../icons';
import {
  Options,
  Option,
  Selected,
  Control,
} from './styled';
import Icon from '../Icon';
import { Target } from '../Styled';

const FilterSelect = ({ placeholder, options, onChange, isError, theme }) => {
  const [state, setState] = useState({ selected: [], values: [] });
  const label = placeholder || 'select...';

  const select = (e, item) => {
    let selected = state.selected;
    let values = state.values;
    selected.push(item);
    values.push(item.value);

    setState({ selected, values });
    onChange(values);
  }

  const selectAll = () => {
    let all = [...options];
    let values = all.map(item => item.value);

    setState({ selected: all, values });
    onChange(values);
  }

  const unselectAll = () => {
    setState({ selected: [], values: [] });
    onChange([]);
  }

  const unselect = (e, item) => {
    e.stopPropagation();
    let sIndex = state.selected.indexOf(item);
    let selected = state.selected;
    selected.splice(sIndex, 1);

    let vIndex = state.values.indexOf(item.value);
    let values = state.values;
    values.splice(vIndex, 1);

    setState({ selected, values });
    onChange(values);
  }

  const renderTarget = ({ show }) => (

    <Target onClick={show} isError={isError} value={state.value} tabIndex='0'>
      {label}
      <div className='icon'>
        <Icon name='caret' size='5px' color={theme.colors.ground} />
      </div>
    </Target>

  )

  const renderSelected = () => state.selected.map((item, i) => (
    <div key={`${item.value}`}>
      {item.label}
      <div onClick={e => unselect(e, item)}>
        <Delete
          size={8}
          color={theme.colors[getContrastYIQ(theme.colors.primary)]}
          margin='0 0 0 8px'
        />
      </div>
    </div>
  ));

  const renderDropdown = () => (
    <>
      <Control>
        <Selected>{renderSelected()}</Selected>
        {state.selected.length === 0 ? (
          <div className='button' onClick={selectAll}>
            All
          </div>
        ) : (
          <div className='button' onClick={unselectAll}>
            Reset
          </div>
        )}
      </Control>
      <Options>
        {
          options && options.map((item, i) => {
            let isSelected = state.selected.includes(item);
            return (
              <Option
                key={`${item.value}`}
                isSelected={isSelected}
                onClick={
                  isSelected
                    ? e => unselect(e, item)
                    : e => select(e, item)
                }
              >
                {item.label}
              </Option>
            );
          })
        }
      </Options>
    </>
  )

  return <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
}

FilterSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

FilterSelect.defaultProps = {
  placeholder: 'select...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(FilterSelect);
