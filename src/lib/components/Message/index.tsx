import React, { FC, useState } from 'react'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import { getColorLuminance, getContrastYIQ } from '../../utils';
import Icon from '../Icon';

type Props = {
  kind?: string,
  title?: string,
  content?: string,
  children?: React.ReactChildren,
  theme: any
}

const Message: FC<Props> = ({ kind, title, content, children, theme }): any => {
  const [state, setState] = useState(true)

  return state && (
    <ThemeProvider theme={theme}>
      <Box kind={kind || 'info'}>
        <Close onClick={() => setState(false)}>
          <Icon
            name='delete'
            color={theme.colors[getContrastYIQ(theme.colors[kind || 'info'])]}
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

export default withTheme(Message);

const Box = styled.div<{kind: string}>`
  border-radius: ${props => props.theme.border.radius}px;
  border: 1px solid ${props => props.theme.colors[props.kind]};
  background: ${props => getColorLuminance(props.theme.colors[props.kind], 0.3)};
  color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors[props.kind])]};
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
