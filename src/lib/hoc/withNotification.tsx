import React from 'react';
import styled from 'styled-components';

export default function withNotification(Component: any) {
  return (props: any) => {
    const { count, ...rest } = props;
    return (
      <Wrapper>
        <Badge><span>{count}</span></Badge>
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
  top: -9px;
  left: calc(100% - 9px);
  user-select: none;
  display: flex;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 0 5px;
    text-align: center;
    height: 18px;
    min-width: 18px;
    font-size: 0.8rem;
    border-radius: 9px;
    background: red;
    color: white;
  }
`
