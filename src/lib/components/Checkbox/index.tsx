import React, { useState, FC } from 'react';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import { getContrastYIQ, styles } from '../../theme';
import Icon from '../Icon';
import { focus } from '../Styled/css';

interface Props {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: (value: any) => void;
  theme?: any;
}

const Checkbox: FC<Props> = ({
  label,
  name = '',
  checked = false,
  onChange = value => console.log(value),
  theme = styles
}) => {
  const [value, setValue] = useState(checked || false);

  const handleOnClick = e => {
    e.preventDefault();
    const newValue = !value;
    setValue(newValue);

    const data = { value: newValue, checked: newValue, label, name };
    onChange(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Wrapper onClick={handleOnClick}>
        <input type='checkbox' name={name} value={value.toString()} />
        <Check
          role='checkbox'
          name={name}
          value={value}
          aria-label={label}
          aria-checked={value}
          tabIndex={0}
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
const Check = styled.span<{ name: string; value: boolean }>`
  flex-shrink: 0;
  width: 20px;
  height: 20px;
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
    position: absolute;
    opacity: ${props => (props.value ? 1 : 0)};
  }
`;
const Label = styled.span`
  display: inline-block;
  margin-left: 5px;
`;
