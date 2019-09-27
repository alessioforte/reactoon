import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Dropbox from '../Dropbox';
import Slider from '../Slider';
import Icon from '../Icon';
import { Content, Control } from './styled';
import { Target } from '../Styled';
import { styles } from '../../theme';

const FilterSlider = ({ placeholder, min, max, onChange, isError, theme }) => {
  const [state, setState] = useState({ value: [min, max] });
  const [reset, setReset] = useState(false);
  const label = placeholder || 'select...';

  const resetValue = () => {
    const value = [min, max];
    setState({ value });
    onChange(value);
    setReset(!reset);
  };

  const onSliderChange = data => {
    const { value } = data;
    setState({ value });
    onChange(value);
  };

  const renderTarget = ({ show }) => (
    <Target onClick={show} isError={isError} tabIndex='0'>
      {label}
      <div className='icon'>
        <Icon name='caret' size='5px' color={theme.colors.ground} />
      </div>
    </Target>
  );

  const renderDropdown = () => (
    <>
      <Control>
        <div>{state.value[0]} - {state.value[1]}</div>
        {(min !== state.value[0] || max !== state.value[1]) && (
          <div className='button' onClick={resetValue}>
            Reset
          </div>
        )}
      </Control>
      <Content>
        <Slider
          range
          showTooltip
          min={min}
          max={max}
          initialValue={[...state.value]}
          onChange={onSliderChange}
          reset={reset}
        />
      </Content>
    </>
  );

  return (
    <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
  );
};

FilterSlider.propTypes = {
  onChange: PropTypes.func.isRequired
};

FilterSlider.defaultProps = {
  placeholder: 'select...',
  onChange: value => console.log(value),
  theme: styles
};

export default withTheme(FilterSlider);
