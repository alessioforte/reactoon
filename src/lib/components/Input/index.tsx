import React, { FC, useState } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme from '../../theme';
import { getContrastYIQ } from '../../utils';
import { focus } from '../Styled/css';

interface Props {
  type?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  isError?: boolean;
  onChange?: (data: any) => void;
  message?: string;
  ref?: React.MutableRefObject<HTMLInputElement | null>;
  theme: any;
}

const Input: FC<Props> = ({
  type = 'input',
  placeholder,
  name,
  value,
  isError = false,
  onChange = data => console.log(data),
  message,
  theme = Theme.styles,
  ref
}) => {
  const [state, setState] = useState(value || '');
  const [hasValue, setHasValue] = useState(!!value);

  const handleChange = e => {
    const v = e.target.value;
    const data = { value: v, name, type };
    setHasValue(!!v);
    setState(v);
    onChange(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box isError={isError}>
        <input
          ref={ref}
          type={type}
          name={name}
          onChange={handleChange}
          value={state}
          data-value={hasValue}
        />
        <Label>{isError ? <span>{message}</span> : placeholder}</Label>
      </Box>
    </ThemeProvider>
  );
};

export default withTheme(Input);

/* eslint-disable */
const Box = styled.div<{ isError?: boolean }>`
  box-sizing: border-box;
  position: relative;
  min-height: 30px;
  margin-top: 20px;
  input {
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
    background: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.border.radius + 'px'};
    border: 1px solid
      ${props =>
        props.isError
          ? props.theme.colors.error
          : props.theme.colors.background};
    box-sizing: border-box;
    width: 100%;
    min-height: 28px;
    padding: 0 10px;
    &:focus {
      ${focus}
    }
  }
  input:focus + label,
  input:not([data-value='false']) + label {
    transform: translateY(-23px) scale(0.9);
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.groundzero)]};
  }
`;
const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  right: auto;
  max-width: 100%;
  transform-origin: top left;
  margin-top: 8px;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  pointer-events: none;
  padding: 0 10px;
  color: ${props => props.theme.colors.ground};
  font-size: 12px;
  span {
    color: ${props => props.theme.colors.error};
  }
`;
