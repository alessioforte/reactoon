import React from 'react';
import styled from 'styled-components';
import { useSwipeable } from '../../hooks';

interface Props {
  children?: any;
  enableTransition?: boolean;
  enableSwipe?: boolean;
  height?: number | string;
  duration?: number;
}

const Carousel: React.FC<Props> = ({
  children,
  enableTransition = false,
  enableSwipe = false,
  height = 320,
  duration = 7000
}) => {
  const {
    isSwiping,
    offset,
    onMouseDown,
    onTouchStart,
    index,
    shift
  } = useSwipeable({
    length: children.length,
    duration,
    enableTransition
  });

  const H = typeof height === 'string' ? height : `${height}px`;
  const swipeProps = enableSwipe ? { onMouseDown, onTouchStart, isSwiping } : {};
  return (
    <Slides height={H}>
      {Array.isArray(children) ? (
        <Swipeable
          height={H}
          offset={offset}
          index={index}
          {...swipeProps}
        >
          {children.map((child, i) => (
            <Slide key={`slide-${i}`}>{child}</Slide>
          ))}
        </Swipeable>
      ) : (
        <div>{children}</div>
      )}

      <Container>
        <Dots>
          {Array.isArray(children) &&
            React.Children.map(children, (child, i) => (
              <Dot key={i} onClick={() => shift(i)} active={i === index} />
            ))}
        </Dots>
      </Container>
    </Slides>
  );
};

export default Carousel;

const Slides = styled.div<{ height: string | number }>`
  width: 100vw;
  position: relative;
  display: flex;
  overflow: hidden;
  height: ${props => props.height};
`;
const Swipeable = styled.div.attrs(({ offset, index, isSwiping }: any) => ({
  style: {
    transform: `translate(calc(-${100 * index}% + ${offset}px), 0px)`,
    transition: isSwiping
      ? 'none'
      : 'all 0.7s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
  }
}))<{
  height: number | string;
  offset: number;
  index: number;
  isSwiping?: boolean;
}>`
  height: ${props => props.height};
  display: flex;
  width: 100vw;
`;
const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
`;
const Container = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 3;
  & > div {
    margin: auto;
    max-width: 1380px;
    padding: 10px 30px;
  }
`;
const Dots = styled.div`
  display: flex;
  justify-content: center;
`;
const Dot = styled.div<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => (props.active ? 'white' : 'rgba(0,0,0,0.3)')};
  margin: 5px;
  cursor: pointer;
`;
