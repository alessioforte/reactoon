import React from 'react';
import styled from 'styled-components';
import { Carousel } from '../lib';

export default (): React.ReactElement => (
  <Wrapper>
    <Carousel
      height={600}
      enableSwipe
      // duration={7000}
      // enableTransition
    >
      <Slide color='gray'>slide 1</Slide>
      <Slide color='green'>slide 2</Slide>
    </Carousel>
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 30px;
  max-width: 600px;
`;
const Slide = styled.div`
  background: ${props => props.color || 'gray'};
  width: 100%;
  height: 100%;
`;
