import React from 'react'
import styled, { keyframes } from 'styled-components'

export default ({ children, text }) => {
    return (
        <Popup>
            <Info>{ text }</Info>
            { children }
        </Popup>
    )
}

const delay = keyframes`
    0% {
        opacity: 0;
    }
    75% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`
const Popup = styled.div`
    position: relative;
    display: inline-block;
    & > div:first-child {
            display: none;
            animation: 1.5s ${delay} ease;
        }
    &:hover {
        & >div:first-child {
            display: block;

        }
    }
`
const Info = styled.div`
    box-sizing: border-box;
    position: absolute;
    background: #1a1a1a;
    padding: 9px;
    bottom: 45px;
    border-radius: 3px;
    font-size: 12px;
    left: calc(50% - 60px);
    width: 120px;
    text-align: center;
    box-shadow: 0px 1px 30px 1px rgba(0, 0, 0, 0.2);
    &::after {
        content: '';
        width: 15px;
        height: 15px;
        background: #1a1a1a;
        position: absolute;
        bottom: -7px;
        left: 53px;
        transform: rotate(45deg);
        border-radius: 15px 1px 2px 1px;
    }
`