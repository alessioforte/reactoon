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
  height?: string;
  maxHeight?: string;
  className?: string;
}

const width = '600px';
const height = '600px';

const Scrollable: FC<Props> = ({
  children,
  height = '100%',
  maxHeight = '100%',
  className = ''
}) => {
  const container: React.MutableRefObject<
    HTMLDivElement | undefined
  > = useRef();
  const [barHeight, setBarHeight] = useState<number>(0);
  const [barPosition, setBarPostion] = useState<number>(0);
  const [showBar, setShowBar] = useState<boolean>(false);

  useEffect(() => {
    if (container.current) {
      const h = 600 / (container?.current.scrollHeight / 600);
      setBarHeight(h);
    }
  }, []);

  const handleScroll = e => {
    const { scrollTop, scrollHeight } = e.target;
    const p = (100 / scrollHeight) * scrollTop;
    setBarPostion(p);
  };

  return (
    <div style={{ position: 'relative', height, width }}>
      <Scrollbar>
        <Bar style={{ height: barHeight, top: `${barPosition}%` }}></Bar>
      </Scrollbar>
      <Container
        ref={container}
        onScroll={handleScroll}
        onMouseLeave={() => setShowBar(false)}
        onMouseEnter={() => setShowBar(true)}
      >
        <Content className={className}>
          {children && Children.toArray(children)}
        </Content>
      </Container>
    </div>
  );
};

export default Scrollable;

const Container = styled.div<{ ref: any }>`
  width: ${width};
  height: ${height};
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
const Scrollbar = styled.div`
  z-index: 999;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 14px;
  float: right;
  pointer-events: none;
`;
const Bar = styled.div`
  width: 14px;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
`;
