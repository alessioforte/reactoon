import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import { focus } from '../Styled/css';

const Input = ({
  type,
  placeholder,
  name,
  value,
  isError,
  onChange,
  message,
  theme
}) => {
  const input = React.createRef();
  const hasValue = value ? true : false;

  const handleChange = e => {
    let value = e.target.value;
    input.current.setAttribute('data-value', value !== '' ? true : false);
    onChange(e, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box isError={isError}>
        <input
          ref={input}
          type={type}
          name={name}
          onChange={handleChange}
          value={value}
          data-value={hasValue}
        />
        <Label>{isError ? <span>{message}</span> : placeholder}</Label>
        {/* <Line isError={isError} /> */}
      </Box>
    </ThemeProvider>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  isError: PropTypes.bool,
  onChange: PropTypes.func
};

Input.defaultProps = {
  type: 'input',
  placeholder: '',
  onChange: () => {},
  isError: false,
  min: null,
  max: null,
  theme: Theme.styles
};

export default withTheme(Input);

/* eslint-disable */
const Box = styled.div`
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
// const Line = styled.div`
//   position: absolute;
//   bottom: -1px;
//   left: -1px;
//   right: -1px;
//   height: 2px;
//   pointer-events: none;
//   background: ${props => (props.isError ? props.theme.colors.error : 'none')};
// `;
