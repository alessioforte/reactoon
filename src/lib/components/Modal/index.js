import React, { Children, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import styled, { withTheme } from 'styled-components';

let ROOT_ID = 'root-modal';

const Modal = ({ size, children, render, shouldCloseOnOverlayClick }) => {
  const [visible, setState] = useState(false);
  const overlay = useRef();

  const open = () => {
    setState(true);
  };

  const close = e => {
    if (e.target === overlay.current) {
      setState(false);
    }
  };

  const renderModal = () => {
    const ROOT_NODE = document.getElementById(ROOT_ID);
    const Root = (
      <Overlay onClick={shouldCloseOnOverlayClick && close} ref={overlay}>
        <Content size={size}>{render && render({ close })}</Content>
      </Overlay>
    );
    return createPortal(Root, ROOT_NODE);
  };

  return (
    <>
      <Target onClick={open}>{Children.toArray(children)}</Target>
      {visible && renderModal()}
    </>
  );
};

Modal.setRoot = (APP_NODE, id) => {
  ROOT_ID = id;
  let node = document.getElementById(ROOT_ID);
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('id', ROOT_ID);
    APP_NODE.insertAdjacentElement('afterend', node);
  }
};

Modal.defaultProps = {
  size: [600, 800]
};

Modal.propsType = {
  size: PropTypes.arrayOf(PropTypes.number)
};

export default withTheme(Modal);

export const Target = styled.div`
  display: inline-block;
  width: fit-content;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 999;
  overflow: scroll;
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 0;
`;
const Content = styled.div`
  padding: 30px;
  background: white;
  border-radius: 5px;
  height: ${props => props.size[1]}px;
  width: ${props => props.size[0]}px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  justify-self: center;
  align-self: center;
  flex-basis: auto;
  z-index: 999;
  overflow: scroll;
`;
