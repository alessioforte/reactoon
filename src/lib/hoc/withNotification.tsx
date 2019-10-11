import React from 'react';
import styled from 'styled-components';

export default function withNotification(Component: any) {
  return (props: any) => {
    const { count, ...rest } = props;
    return (
      <Wrapper>
        <Badge>{count}</Badge>
        <Component { ...rest } />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`
const Badge = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  top: -10px;
  right: -10px;
  background: red;
  color: white;
`
