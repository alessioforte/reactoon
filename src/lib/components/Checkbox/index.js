import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import { getContrastYIQ, styles } from '../../theme';
import Icon from '../Icon';
import { focus } from '../Styled/css';

const Checkbox = ({ label, name, checked, onChange, theme }) => {
  const [value, setValue] = useState(checked || false);

  const handleOnClick = e => {
    e.preventDefault();
    setValue(!value);

    const data = { checked: !value, label };
    onChange(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper onClick={handleOnClick}>
        <input type='checkbox' name={name} value={value} />
        <Check
          role='checkbox'
          name={name}
          value={value}
          aria-label={label}
          aria-checked={value}
          tabIndex='0'
        >
          <Icon
            name='checkmark'
            size='9px'
            color={theme.colors[getContrastYIQ(theme.colors.primary)]}
          />
        </Check>
        {label && <Label>{label}</Label>}
      </Wrapper>
    </ThemeProvider>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  theme: PropTypes.object
};

Checkbox.defaultProps = {
  checked: false,
  onChange: value => console.log(value),
  theme: styles
};

export default withTheme(Checkbox);

const Wrapper = styled.label`
  display: inline-flex;
  width: fit-content;
  cursor: pointer;
  font-size: 1rem;
  & > input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
`;
const Check = styled.span`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  background: ${props =>
    props.value ? props.theme.colors.primary : props.theme.colors.background};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
  &:focus {
    ${focus}
  }
  & svg {
    opacity: ${props => (props.value ? 1 : 0)};
  }
`;
const Label = styled.span`
  display: inline-block;
  margin-left: 5px;
`;
