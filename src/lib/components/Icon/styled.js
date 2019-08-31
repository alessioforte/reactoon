import styled from 'styled-components'

export const Svg = styled.svg`
    fill: ${props => props.color};
    width: ${props => props.width};
    margin: ${ props => props.margin || 0};
    transform: ${props => `rotate(${props.rotate || 0}deg)`};
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
