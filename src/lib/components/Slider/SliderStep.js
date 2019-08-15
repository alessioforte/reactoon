import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../theme/colors'

class SliderStep extends Component {

    constructor(props) {
        super(props)

        this.min = props.min || 0
        this.max = props.max || 100
        this.step = props.step || this.max / 10
        this.stepsCount = this.max / this.step || 10
        this.range = this.max - this.min
        this.height = 30
        this.width = props.width || 300
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.clickOnBar = this.clickOnBar.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.slider = React.createRef()
        this.steps = []

        for (let i = 1; i < this.stepsCount; i++) {
            let left = (this.width - this.height) / (this.stepsCount) * i
            this.steps.push(<Step key={left} left={left} />)
        }

        this.state = {
            value: this.min,
            offset: 0,
            left: 0,
            pressed: false,
            isError: false
        }
    }

    onMouseDown(e) {
        e.preventDefault()
        this.setState({ pressed: true })
        this.startX = e.clientX
        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseMove(e) {
        e.preventDefault()
        let width = this.width - this.height,
            endX = e.clientX - this.startX,
            offset = this.state.offset + endX,
            value = Math.round(this.range / width * offset) + this.min,
            step = width / this.stepsCount

        value = Math.round(value / this.step) * this.step
        offset = Math.round(offset / step) * step

        this.setState({ value, left: offset })

        if (offset < 0) {
            this.setState({ value: this.min, left: 0 })
        } else if (offset > width) {
            this.setState({ value: this.max, left: width })
        }
    }

    onMouseUp(e) {
        let { left } = this.state

        this.setState({ pressed: false })

        if (left < 0) {
            this.setState({ offset: 0, left: 0 })
        } else if (left > this.width) {
            this.setState({ offset: this.width, left: this.width })
        } else {
            this.setState({ offset: left })
        }
        if (this.props.onChange) this.props.onChange(this.state.value)
        
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    clickOnBar(e) {
        let barLeft = this.slider.current.getBoundingClientRect().left,
            width = this.width - this.height,
            x = e.clientX,
            offset = x - barLeft - (this.height / 2),
            value = Math.round(this.range / this.width * offset) + this.min,
            step = width / this.stepsCount

            value = Math.round(value / this.step) * this.step
            offset = Math.round(offset / step) * step

        if (this.props.onChange) this.props.onChange(value)
        
        this.setState({ value, offset, left: offset })
    }

    handleInput(e) {
        let width = this.width - this.height
        let value = Number(e.target.value)
        let left = 0

        if (isNaN(value)) return

        if (value < this.min) {
            this.setState({ isError: true })
        } else if (value > this.max) {
            left = width
            this.setState({ isError: true })
        } else {
            left = width * (value - this.min) / this.range
            this.setState({ isError: false })
        }

        this.setState({ left, value, offset: left })

        if (this.props.onChange) this.props.onChange(value)
    }

    render() {
        const { left, pressed, value, isError } = this.state

        return (
            <Block>
                <Slide
                    ref={this.slider}
                    width={this.width}
                    height={this.height}
                >
                    <Selector
                        width={this.height}
                        left={left}
                        onMouseDown={this.onMouseDown}
                    >
                        <Knob
                            width={this.height}
                            pressed={pressed}
                            idle={left === 0}
                        />
                    </Selector>

                    <Bar
                        onClick={this.clickOnBar}
                        margin={this.height / 2}
                    >
                        <Progress width={left} />
                        { this.steps }
                    </Bar>
                </Slide>
                {
                    this.props.input && (
                        <Input
                            type='number'
                            min={this.min}
                            max={this.max}
                            value={String(value)}
                            onChange={this.handleInput}
                            isError={isError}
                        />
                    )
                }
            </Block>
        )
    }
}

SliderStep.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    label: PropTypes.string
}

export default SliderStep

const Block = styled.div`
    position: relative;
    display: inline-flex;
    height: 30px;
`
const Slide = styled.div`
    box-sizing: border-box;
    height: ${props => props.height + 'px'};
    width: ${props => props.width + 'px'};
    position: relative;
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Bar = styled.div`
    margin: ${props => props.margin + 'px'};
    height: 5px;
    border-radius: 2.5px;
    background: ${colors.back};
    width: 100%;
    position: relative;
`
const Selector = styled.div.attrs(props => ({
        style: {
            height: props.width + 'px',
            width: props.width + 'px',
            left: props.left + 'px'
        }
    }))`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    color: white;
`
const Knob = styled.div.attrs(props => ({
        style: {
            width: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            height: props.pressed ? `${props.width}px` : `${props.width/2}px`,
            background: props.idle ? colors.idle : colors.primary
        }
    }))`
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.1s ease-out;
    z-index: 1;
`
const Progress = styled.div.attrs(({ width }) => ({
        style: { width: width + 'px' }
    }))`
    height: 100%;
    background: #2182BD;
    border-radius: 2.5px;
    opacity: 0.8;
`
const Input = styled.input`
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
const Step = styled.div`
    height: 5px;
    width: 5px;
    background: ${colors.idle};
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: ${props => props.left + 'px'};
`