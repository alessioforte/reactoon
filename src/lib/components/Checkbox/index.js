import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import { getContrastYIQ, styles } from '../../theme';
import Icon from '../Icon';
import { focus } from '../Styled/css'

const Checkbox = ({ label, name, checked, onChange, theme }) => {
  const [value, setValue] = useState(checked || false);

  const handleOnClick = () => {
    setValue(!value);

    const data = { checked: !value, label };
    onChange(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box onClick={handleOnClick}>
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
      </Box>
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

const Box = styled.label`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
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
