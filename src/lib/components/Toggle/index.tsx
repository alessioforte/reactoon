import React, { FC, useState } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';
import { styles } from '../../theme';
import { Props, Data } from './interfaces'
import { Knob, Label } from './styled'

const Toggle: FC<Props> = ({ label, initialValue, onChange, theme }) => {
  const [value, setValue] = useState<boolean>(initialValue)

  const handleOnClick = (e: any): any => {
    const checked: boolean = !value
    setValue(checked)
    const data: Data = { checked, label }
    onChange(e, data)
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Knob
          onClick={handleOnClick}
          active={value}
        >
        </Knob>
        {label && <Label>{label}</Label>}
      </>
    </ThemeProvider>
  );
}

Toggle.defaultProps = {
  initialValue: false,
  theme: styles
}

export default withTheme(Toggle);

