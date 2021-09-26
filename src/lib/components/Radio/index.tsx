import React, { useState, FC } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme from '../../theme';
import { getContrastYIQ } from '../../utils';
import { focus } from '../Styled/css';

interface Props {
  name?: string;
  label?: string;
  options?: Option[];
  onChange?: (data: any) => void;
  inline?: boolean;
  theme: any;
}

interface Option {
  label: string;
  value: any;
}

const Radio: FC<Props> = ({
  name,
  label = 'select...',
  options = [],
  onChange = data => console.log(data),
  inline = false,
  theme = Theme.styles
}) => {
  const initialValue: Option = options.length > 0 ? options[0].value : null;
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
          {options.map(option => (
            <label key={`${option.label}`}>
              <input
                type='radio'
                name={name}
                value={option.value}
                tabIndex={-1}
              />
              <Option
                onClick={e => handleOnClick(e, option.value)}
                active={value === option.value}
              >
                <div className='selector' tabIndex={0} />
                <span>{option.label}</span>
              </Option>
            </label>
          ))}
        </Options>
      </div>
    </ThemeProvider>
  );
};

export default withTheme(Radio);

/* eslint-disable */
const Placeholder = styled.span`
  font-weight: bold;
`;
const Options = styled.div<{ inline?: boolean }>`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
`;
const Option = styled.div<{ active?: boolean }>`
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
