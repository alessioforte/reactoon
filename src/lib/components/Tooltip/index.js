import React, { Children, useState } from 'react';
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { styles, getContrastYIQ } from '../../theme'

const rootApp = document.getElementById('root')
const id = 'root-tooltip'
let root = document.querySelector(`#${id}`)
if (!root) {
  root = document.createElement('div')
  root.setAttribute('id', id)
  rootApp.insertAdjacentElement('afterend', root)
}

const Tooltip = ({ text, children }) => {
  let target = React.createRef()
  const [state, setState] = useState({
    visible: false,
    position: {},
  })



  const show = () => {
    const rect = target.current.getBoundingClientRect()
    const { top, right, bottom, left, height, width, x, y } = rect
    const { innerHeight, innerWidth, scrollY } = window

    const position = {
      bottom: innerHeight - top - scrollY + 5,
      left: x > 150 ? left + width / 2 - 150 : left,
      justifyContent: x > 150 ? 'center' : 'flex-start'
    }
    setState({ visible: true, position })
  }

  const hide = () => {
    setState({ visible: false, position: {} })
  }

  const renderTooltip = () => {
    return createPortal(
      <Tip position={state.position} width={state.width}>
        <div>{text}</div>
      </Tip>,
      root
    )
  }

  return (
    <>
      <Target
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        ref={target}
      >
        {Children.toArray(children)}
      </Target>
    { state.visible && renderTooltip()}
    </>
  )
}

Tooltip.propTypes = {
  children: PropTypes.node,
  text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  theme: PropTypes.object
}

Tooltip.defaultProps = {
  theme: styles
}

export default Tooltip;

const delay = keyframes`
    0% {
        opacity: 0;
    }
    75% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
const Target = styled.div`
  display: inline-block;
`
const Tip = styled.div.attrs(({ position }) => ({ style: position }))`
  position: absolute;
  animation: 0.9s ${delay} ease;
  font-size: 12px;
  width: 300px;
  max-height: 150px;
  display: flex;
  justify-content: flex-start;
  & > div {
    box-sizing: border-box;
    text-align: center;
    display: inline-block;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
    padding: 9px;
    box-shadow: ${props => props.theme.colors.shadow};
    border-radius: ${props => props.theme.border.radius + 'px'};
  }
`
