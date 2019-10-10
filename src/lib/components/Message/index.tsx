import React, { FC } from 'react'
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { styles, getColorLuminance } from '../../theme';

type Props = {
  status: string,
  children: React.ReactChildren,
  theme: any
}

const Message: FC<Props> = ({ status, children, theme }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box status={status}>
        {children}
      </Box>
    </ThemeProvider>
  )
}

Message.propTypes = {
  status: PropTypes.string,
}

Message.defaultProps = {
  status: 'info',
  theme: styles
}

export default withTheme(Message)

const Box = styled.div<{status: string}>`
  border-radius: ${props => props.theme.border.radius}px;
  border: 1px solid ${props => props.theme.colors[props.status]};
  background: ${props => getColorLuminance(props.theme.colors[props.status], 0.3)};
`
