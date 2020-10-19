import React, {
  Children,
  useState,
  useRef,
  useEffect,
  ReactNode,
  FunctionComponent,
  ForwardRefExoticComponent
} from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes, withTheme } from 'styled-components';
import { styles, getContrastYIQ } from '../../theme';

let ROOT_ID = 'root-tooltip';

type Props = {
  children: React.ReactElement;
  content: (props: any) => ReactNode;
  theme: any;
};

const Tooltip: FunctionComponent<Props> = ({ content, children, theme = styles }) => {
  const target: React.MutableRefObject<HTMLDivElement | undefined> = useRef();
  const tip: React.MutableRefObject<HTMLDivElement | undefined> = useRef();

  const [visible, setState] = useState<boolean>(false);

  useEffect(() => {
    if (tip.current && target.current) {
      const rect = target.current.getBoundingClientRect();
      const { innerHeight, innerWidth, scrollY } = window;
      const { width, height } = tip.current.getBoundingClientRect();
      const right = innerWidth - (rect.x + rect.width);
      const position = {
        bottom: `${innerHeight - rect.top - scrollY + 5}px`,
        left: `${rect.left + rect.width / 2 - width / 2}px`
      };

      if (width / 2 > rect.x + rect.width / 2 && width > rect.width) {
        position.left = `${rect.left}px`;
      }

      if (right < width / 2) {
        position.left = `${innerWidth -
          (innerWidth - rect.x) -
          width +
          rect.width}px`;
      }

      if (rect.y < height) {
        position.bottom = `${innerHeight -
          rect.top -
          scrollY -
          height -
          rect.height -
          5}px`;
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
    const ROOT_NODE: any = document.getElementById(ROOT_ID);
    const Root = <Tip ref={tip}>{content}</Tip>;
    return createPortal(Root, ROOT_NODE);
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

interface FC<P> extends ForwardRefExoticComponent<P> {
  setRoot: (APP_NODE: Element, id: string) => void;
}

const FREC: FC<Props> = withTheme(Tooltip) as FC<Props>;

FREC.setRoot = (APP_NODE, id) => {
  ROOT_ID = id;
  let node = document.getElementById(ROOT_ID);
  if (!node) {
    node = document.createElement('div');
    node.setAttribute('id', ROOT_ID);
    APP_NODE.insertAdjacentElement('afterend', node);
  }
};

export default FREC;

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
export const Target = styled.div<{ ref: any }>`
  display: inline-block;
  width: fit-content;
`;
export const Tip = styled.div<{ ref: any }>`
  position: absolute;
  left: -800px;
  z-index: 99;
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
