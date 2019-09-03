import React, { Children, useState, useEffect } from 'react';
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { styles, getContrastYIQ } from '../../theme'

const ROOT_NODE = document.createElement('div');

const Tooltip = ({ text, children }) => {
  const target = React.createRef()
  const tip = React.createRef()

  const [state, setState] = useState({ visible: false })

  useEffect(() => {
    if (tip.current) {
      const rect = target.current.getBoundingClientRect()
      const { innerHeight, innerWidth, scrollY } = window
      const { width, height } = tip.current.getBoundingClientRect()

      const position = {
        bottom: `${innerHeight - rect.top - scrollY + 5}px`,
        left: `${rect.left + rect.width / 2 - width / 2}px`
      }

      if (rect.x < width / 2) {
        position.left = `${rect.left}px`
      }

      if (innerWidth - (rect.x + rect.width) < width / 2) {
        const right = innerWidth - (rect.x + rect.width)
        position.left = null
        position.right = `${right}px`
      }

      if (rect.y < height) {
        position.top = `${rect.y + rect.height + 5}px`
        position.bottom = null
      }

      Object.assign(tip.current.style, position)
    }
  })

  const show = () => {
    setState({ visible: true })
  }

  const hide = () => {
    setState({ visible: false })
  }

  const renderTooltip = () => {
    return createPortal(<Tip ref={tip}>{text}</Tip>, ROOT_NODE)
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

function setRoot(APP_NODE, id) {
  ROOT_NODE.setAttribute('id', id)
  APP_NODE.insertAdjacentElement('afterend', ROOT_NODE)
}

Tooltip.setRoot = setRoot

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
const Tip = styled.div`
  position: absolute;
  padding: 9px;
  animation: 0.9s ${delay} ease;
  font-size: 12px;
  max-height: 150px;
  max-width: 300px;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  box-shadow: ${props => props.theme.colors.shadow};
  border-radius: ${props => props.theme.border.radius + 'px'};
`
