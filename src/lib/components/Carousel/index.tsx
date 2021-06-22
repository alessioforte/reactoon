import React from 'react';
import styled, { css } from 'styled-components';
import { useSwipeable } from '../../hooks';
import Icon from '../Icon';

interface Props {
  children?: any;
  enableTransition?: boolean;
  enableSwipe?: boolean;
  enableArrows?: boolean;
  enableDots?: boolean;
  height?: number | string;
  duration?: number;
  transitionEffect?: 'slide' | 'fade';
}

const Carousel: React.FC<Props> = ({
  children,
  enableTransition = false,
  enableSwipe = false,
  enableDots = false,
  enableArrows = false,
  height = 320,
  duration = 7000,
  transitionEffect = 'slide'
}) => {
  const slides = React.Children.toArray(children);

  const { isSwiping, offset, onMouseDown, onTouchStart, index, shift } =
    useSwipeable({
      length: children.length,
      duration,
      enableTransition
    });

  const H = typeof height === 'string' ? height : `${height}px`;

  const swipeProps = enableSwipe
    ? { onMouseDown, onTouchStart, isSwiping }
    : {};

  return (
    <Slides height={H}>
      <Swipeable
        height={H}
        offset={transitionEffect === 'slide' ? offset : undefined}
        index={index}
        {...swipeProps}
      >
        {slides.map((child, i) => (
          <Slide key={`${i}-slide`} isVisible={index === i} effect={transitionEffect}>
            {child}
          </Slide>
        ))}
      </Swipeable>
      {enableDots && (
        <Container>
          <Dots>
            {Array.isArray(children) &&
              React.Children.map(children, (child, i) => (
                <Dot key={`${i}-dot`} onClick={() => shift(i)} active={i === index} />
              ))}
          </Dots>
        </Container>
      )}
      {enableArrows && (
        <>
          <Arrow>
            <IconBox
              onClick={() => shift((index + slides.length - 1) % slides.length)}
            >
              <Icon name='caret-left' size='20px' color='#fff' />
            </IconBox>
          </Arrow>
          <Arrow rightSide>
            <IconBox onClick={() => shift((index + 1) % slides.length)}>
              <Icon name='caret-right' size='20px' color='#fff' />
            </IconBox>
          </Arrow>
        </>
      )}
    </Slides>
  );
};

export default Carousel;

interface SwipeableProps {
  height?: number | string;
  offset?: number | undefined;
  index?: number;
  isSwiping?: boolean;
}

const Slides = styled.div<{ height: string | number }>`
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
  height: ${props => props.height};
`;
const Slide = styled.div<{ effect?: string; isVisible?: boolean }>`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  ${props => createEffect(props)}
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
const Swipeable = styled.div.attrs(({ offset, index, isSwiping }: any) => ({
  style: {
    transform: offset && `translate(calc(-${100 * index}% + ${offset}px), 0px)`,
    transition: isSwiping
      ? 'none'
      : 'all 0.7s cubic-bezier(0.15, 0.3, 0.25, 1) 0s'
  }
}))<SwipeableProps>`
  height: ${props => props.height};
  display: flex;
  width: 100%;
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
const Arrow = styled.div<{ rightSide?: boolean }>`
  position: absolute;
  ${props => props.rightSide && 'right: 0;'}
  width: 42px;
  top: calc(50% - 21px);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  cursor: pointer;
`;
const createEffect = (props: { effect?: string; isVisible?: boolean }) => {
  const effects = {
    slide: css``,
    fade: css`
      position: absolute;
      flex-shrink: 0;
      opacity: ${props.isVisible ? '1' : '0'};
      transition: all 3s cubic-bezier(0.15, 0.3, 0.25, 1) 0s;
    `
  };
  return effects[props.effect || 'slide'];
};
