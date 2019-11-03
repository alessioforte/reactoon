import React, { FunctionComponent, ReactNode, Children, useState, useRef, ReactElement } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

let ROOT_ID = 'root-modal';

type Props = {
  size: number[],
  children: React.ReactElement,
  render: (props: any) => ReactNode,
  shouldCloseOnOverlayClick: boolean,
}

interface FC<P> extends FunctionComponent<P> {
  setRoot: (APP_NODE: Element, id: string) => void
}

const Modal: FC<Props> = ({ size, children, render, shouldCloseOnOverlayClick }): ReactElement => {
  const [visible, setState] = useState(false);
  const overlay = useRef();

  const open = () => {
    setState(true);
  };

  const close = (e: any) => {
    if (e.target === overlay.current) {
      setState(false);
    }
  };

  const renderModal = () => {
    const ROOT_NODE: any = document.getElementById(ROOT_ID);
    const handleClickOnOverlay = shouldCloseOnOverlayClick ? close : () => {}
    const Root = (
      <Overlay onClick={handleClickOnOverlay} ref={overlay}>
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

export default Modal;

export const Target = styled.div`
  display: inline-block;
  width: fit-content;
`;
const Overlay = styled.div<{ref: any}>`
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
const Content = styled.div<{size: number[]}>`
  padding: 20;
  background: ${props => props.theme.colors.groundzero};
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
