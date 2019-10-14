import React, { FC, useState } from 'react'
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { styles, getColorLuminance, getContrastYIQ } from '../../theme';
import Icon from '../Icon';

type Props = {
  status?: string,
  title?: string,
  content?: string,
  children: React.ReactChildren,
  theme: any
}

const Message: FC<Props> = ({ status, title, content, children, theme }): any => {
  const [state, setState] = useState(true)

  return state && (
    <ThemeProvider theme={theme}>
      <Box status={status || 'info'}>
        <Close onClick={() => setState(false)}>
          <Icon
            name='delete'
            color={theme.colors[getContrastYIQ(theme.colors[status || 'info'])]}
            size='8px'
          />
        </Close>
        <Header>
          {title && <h3>{title}</h3>}
        </Header>
        <Content>{children || content}</Content>
      </Box>
    </ThemeProvider>
  )
}

Message.propTypes = {
  status: PropTypes.string.isRequired,
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
  color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors[props.status])]};
  padding: 1rem;
  position: relative;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Content = styled.div`
  font-size: 0.8rem;
`
const Close = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`
