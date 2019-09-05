import React, { Children, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { styles, getContrastYIQ } from '../../theme';

const ROOT_NODE = document.createElement('div');

const Tooltip = ({ render, children }) => {
  const target = React.createRef();
  const tip = React.createRef();

  const [visible, setState] = useState(false);

  useEffect(() => {
    if (tip.current) {
      const rect = target.current.getBoundingClientRect();
      const { innerHeight, innerWidth, scrollY } = window;
      const { width, height } = tip.current.getBoundingClientRect();
      const right = innerWidth - (rect.x + rect.width);
      const position = {
        bottom: `${innerHeight - rect.top - scrollY + 5}px`,
        left: `${rect.left + rect.width / 2 - width / 2}px`
      };

      if (rect.x < width / 2 && width > rect.width) {
        position.left = `${rect.left}px`;
      }

      if (right < width / 2) {
        position.left = `${innerWidth - (innerWidth - rect.x) - width + rect.width}px`;
      }

      if (rect.y < height) {
        position.bottom = `${innerHeight - rect.top - scrollY - height - rect.height - 5}px`;
      }

      Object.assign(tip.current.style, position);
    }
  });

  const show = () => {
    setState(true);
  };

  const hide = () => {
    setState(false);
  };

  const renderTooltip = () => {
    return createPortal(<Tip ref={tip}>{render}</Tip>, ROOT_NODE);
  };

  return (
    <>
      <Target
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        ref={target}
        aria-haspopup='true'
      >
        {Children.toArray(children)}
      </Target>
      {visible && renderTooltip()}
    </>
  );
};

function setRoot(APP_NODE, id) {
  ROOT_NODE.setAttribute('id', id);
  APP_NODE.insertAdjacentElement('afterend', ROOT_NODE);
}

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  render: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  theme: PropTypes.object
};

Tooltip.defaultProps = {
  theme: styles
};

Tooltip.setRoot = setRoot;

export default Tooltip;

export const delay = keyframes`
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
export const Target = styled.div`
  display: inline-block;
`;
export const Tip = styled.div`
  position: absolute;
  left: -800px;
  padding: 9px;
  animation: 1.2s ${delay} ease;
  font-size: 12px;
  max-height: 150px;
  max-width: 300px;
  box-sizing: border-box;
  text-align: center;
  background: ${props => props.theme.colors.background};
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  box-shadow: ${props => props.theme.colors.shadow};
  border-radius: ${props => props.theme.border.radius + 'px'};
`;
