import React from 'react';
import styled from 'styled-components';
import { Carousel } from '../lib';

export default (): React.ReactElement => (
  <Wrapper>
    <Carousel
      height={800}
      enableSwipe
      duration={7000}
      enableTransition
      enableArrows
      transitionEffect='fade'
    >
      <Slide color='#5cc9f5'>1</Slide>
      <Slide color='#ff3370'>2</Slide>
      <Slide color='#4af2a1'>3</Slide>
    </Carousel>
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 30px;
  max-width: 800px;
`;
const Slide = styled.div`
  background: ${props => props.color || 'gray'};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 72px;
  color: white;
`;
