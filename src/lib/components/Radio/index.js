import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import { focus } from '../Styled/css';

const Radio = ({ name, label, options, onChange, inline, theme }) => {
  const initialValue = options.length > 0 ? options[0].value : null;
  const [value, setValue] = useState(initialValue);

  const handleOnClick = (e, newValue) => {
    if (newValue !== value) {
      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {label && <Placeholder>{label}</Placeholder>}
        <Options inline={inline}>
          {options.map((option, i) => (
            <label key={`${option.label}-${i}`}>
              <input
                type='radio'
                name={name}
                value={option.value}
                tabIndex='-1'
              />
              <Option
                onClick={e => handleOnClick(e, option.value)}
                active={value === option.value}
              >
                <div className='selector' tabIndex='0' />
                <span>{option.label}</span>
              </Option>
            </label>
          ))}
        </Options>
      </div>
    </ThemeProvider>
  );
};

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  theme: PropTypes.any
};

Radio.defaultProps = {
  inline: false,
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Radio);

/* eslint-disable */
const Placeholder = styled.span`
  font-weight: bold;
`;
const Options = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
`;
const Option = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 5px 0 0;
  cursor: pointer;
  .selector {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.background};
    transition: all 0.3s ease;
    &:hover {
      opacity: 0.8;
    }
    &:focus {
      ${focus}
    }
    &:after {
      content: '';
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${props =>
        props.active ? props.theme.colors.primary : props.theme.colors.ground};
    }
  }
  span {
    margin-left: 5px;
    display: inline-block;
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  }
`;
