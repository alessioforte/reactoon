import React, { Children, useState } from 'react';
import { createPortal } from 'react-dom';
import styled, { withTheme } from 'styled-components';

let ROOT_ID = 'root-modal';

const Modal = ({ size, children, render, shouldCloseOnOverlayClick }) => {
  const [visible, setState] = useState(false);

  const open = () => {
    setState(true);
  };

  const close = () => {
    setState(false);
  };

  const renderModal = () => {
    const ROOT_NODE = document.getElementById(ROOT_ID);
    const Root = (
      <Wrapper>
        <Overlay onClick={shouldCloseOnOverlayClick && close} />
        <Content size={size || [600, 800]}>
          {render && render({ close })}
        </Content>
      </Wrapper>
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

export default withTheme(Modal);

export const Target = styled.div`
  display: inline-block;
  width: fit-content;
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;
const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;
const Content = styled.div`
  padding: 20;
  background: white;
  border-radius: 5px;
  display: inline-block;
  min-height: ${props => props.size[1]}px;
  min-width: ${props => props.size[0]}px;
  margin: 1rem;
  position: relative;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  justify-self: center;
  z-index: 999;
`;
