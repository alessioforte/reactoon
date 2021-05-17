import React, {
  FC,
  ReactElement,
  Children,
  useEffect,
  useState,
  useRef
} from 'react';
import styled from 'styled-components';

interface Props {
  children?: ReactElement | ReactElement[] | string;
  size?: { width: number; height: number };
  maxHeight?: string;
  className?: string;
}

const Scrollable: FC<Props> = ({
  children,
  size,
  className = ''
}) => {
  const container: React.MutableRefObject<
    HTMLDivElement | undefined
  > = useRef();
  const initialY = useRef();
  const scrollPosition = useRef(0);
  const [barHeight, setBarHeight] = useState<number>(0);
  const [barPosition, setBarPostion] = useState<number>(0);
  const [showBar, setShowBar] = useState<boolean>(false);

  useEffect(() => {
    if (container.current) {
      const { clientHeight, scrollHeight } = container.current;
      console.log({ clientHeight, scrollHeight })
      let h = 0;
      if (clientHeight !== scrollHeight) {
        h = clientHeight * clientHeight / scrollHeight;
      }
      setBarHeight(h);
    }
  }, []);

  const handleScroll = e => {
    const { scrollTop, scrollHeight } = e.target;
    const p = (100 / scrollHeight) * scrollTop;
    setBarPostion(p);
  };

  const onMouseDown = e => {
    e.preventDefault();
    initialY.current = e.clientY;
    scrollPosition.current = container.current?.scrollTop || 0;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  const onMouseMove = e => {
    const delta = e.clientY - (initialY.current || 0);
    const perc = (100 / 600) * delta;
    if (container.current) {
      container.current.scrollTop = scrollPosition.current + container.current?.scrollHeight / 100 * perc
    }
  }

  const onMouseUp = e => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  return (
    <div
      style={{
        position: 'relative',
        height: size?.height || '100%',
        width: size?.width || '100%',
      }}
      onMouseLeave={() => setShowBar(false)}
      onMouseEnter={() => setShowBar(true)}
    >
      <VerticalScrollbar>
        <Bar
          style={{
            height: barHeight,
            top: `${barPosition}%`,
            // display: showBar ? 'block' : 'none',
            width: '14px',
            right: 0,
          }}
          onMouseDown={onMouseDown}
        />
      </VerticalScrollbar>
      <HorizontalScrollbar>
      <Bar
          style={{
            width: barHeight,
            // top: `${barPosition}%`,
            // display: showBar ? 'block' : 'none',
            height: '14px',
            left: 0,
          }}
          // onMouseDown={onMouseDown}
        />
      </HorizontalScrollbar>
      <Container
        ref={container}
        onScroll={handleScroll}
        size={size}
      >
        <Content className={className}>
          {children && Children.toArray(children)}
        </Content>
      </Container>
    </div>
  );
};

export default Scrollable;

const Container = styled.div<{ ref: any, size?: { width: number; height: number } }>`
  width: ${props => `${props.size?.width}px` || '100%'};
  height: ${props => `${props.size?.height}px` || '100%'};
  background: blue;
  position: relative;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none !important;
  }
`;
const Content = styled.div`
  background: green;
`;
const VerticalScrollbar = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 14px;
  float: right;
`;
const HorizontalScrollbar = styled.div`
  z-index: 999;
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 14px);
  background: red;
  height: 14px;
`;
const Bar = styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;
