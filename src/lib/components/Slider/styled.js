import styled from 'styled-components'
import colors from '../../theme/colors'

export const Block = styled.div`
    position: relative;
    display: inline-flex;
    height: 30px;
    margin-top: 30px;
`
export const Slide = styled.div`
    box-sizing: border-box;
    height: ${props => props.height + 'px'};
    width: ${props => props.width + 'px'};
    position: relative;
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Bar = styled.div`
    position: relative;
    margin: ${props => props.margin + 'px'};
    height: 5px;
    border-radius: 2.5px;
    background: ${colors.back};
    width: 100%;
`
export const Selector = styled.div.attrs(props => ({
        style: {
            height: props.width + 'px',
            width: props.width + 'px',
            left: props.left + 'px',
            right: props.right + 'px'
        }
    }))`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    color: white;
`
export const Knob = styled.div.attrs(props => ({
        style: {
            width: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            height: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            background: props.idle ? colors.idle : colors.primary
        }
    }))`
    z-index: 1;
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.1s ease-out;
`
export const KnobLeft = styled.div.attrs(props => ({
        style: {
            width: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            height: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            zIndex: props.over ? '1' : '2'
        }
    }))`
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.1s ease-out;
    background: ${colors.primary};
`
export const KnobRight = styled.div.attrs(props => ({
        style: {
            width: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            height: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            zIndex: props.over ? '2' : '1'
        }
    }))`
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.1s ease-out;
    background: ${colors.primary};
`
export const Progress = styled.div.attrs(({ left, right }) => ({
        style: { left: left + 'px', right: right + 'px' }
    }))`
    position: absolute;
    height: 100%;
    background: ${colors.primary};
    border-radius: 2.5px;
    -webkit-box-shadow: inset 0px 0px 6px 3px rgba(0,0,0,0.3);
    -moz-box-shadow: inset 0px 0px 6px 3px rgba(0,0,0,0.3);
    box-shadow: inset 0px 0px 6px 3px rgba(0,0,0,0.3);
`
export const Tooltip = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 18px;
    background: #1a1a1a;
    top: -20px;
    padding: 0 3px;
    border-radius: 3px;
    color: white;
    font-size: 12px;
`
export const TooltipMiddle = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -33px;
    left: 0;
    right: 0;
    color: white;
    font-size: 12px;
    div {
        background: #1a1a1a;
        border-radius: 3px;
        padding: 0 3px;
        flex-shrink: 0;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`
export const StartValue = styled.div`
    ${props => props.right === true ? 'right: 0' : 'left: 0'};
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 18px;
    background: #1a1a1a;
    top: -20px;
    padding: 0 3px;
    border-radius: 3px;
    color: white;
    font-size: 12px;
`
export const BoxValue = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 18px;
    background: #1a1a1a;
    padding: 0 3px;
    border-radius: 3px;
    color: white;
    font-size: 12px;
`
export const Input = styled.input`
    font-size: 14px;
    width: 40px;
    margin-left: 6px;
    text-align: left;
    padding: 0;
    border: 0;
    background: none;
    color: ${props => props.isError ? colors.error : '#fff'};
    &:focus {
        outline: none;
    }
    &[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`