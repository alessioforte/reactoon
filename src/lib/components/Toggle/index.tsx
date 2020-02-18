import React, { FC, useState } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { styles } from '../../theme';
import { Props, Data } from './interfaces'
import { Block, Knob, Label } from './styled'

const Toggle: FC<Props> = ({ label, initialValue, name, onChange, theme }) => {
  const [value, setValue] = useState<boolean>(initialValue || false)

  const handleOnClick = (e: any): any => {
    const checked: boolean = !value
    setValue(checked)
    const data: Data = { name, value: checked, checked, label }
    onChange(data, e)
  }

  return (
    <ThemeProvider theme={theme}>
      <Block>
        <Knob
          role='checkbox'
          name={name}
          value={value}
          aria-label={label}
          aria-checked={value}
          onClick={handleOnClick}
          active={value}
          tabIndex={0}
        >
        </Knob>
        {label && <Label>{label}</Label>}
      </Block>
    </ThemeProvider>
  );
}

Toggle.defaultProps = {
  initialValue: false,
  theme: styles
}

export default withTheme(Toggle);

