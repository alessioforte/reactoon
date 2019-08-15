import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Block, Slide, Bar, Selector, KnobLeft, KnobRight, Progress, Tooltip, TooltipMiddle, Input } from './styled'

class SliderRange extends Component {

    constructor(props) {
        super(props)

        this.min = props.min || 0
        this.max = props.max || 100
        this.range = this.max - this.min
        this.stepsCount = this.max - this.min
        this.height = 30
        this.width = props.width || 300
        this.slider = React.createRef()
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMoveRight = this.onMouseMoveRight.bind(this)
        this.onMouseUpRight = this.onMouseUpRight.bind(this)
        this.handleInput = this.handleInput.bind(this)

        const minValue = props.initialValue ? props.initialValue.min : this.min
        const maxValue = props.initialValue ? props.initialValue.max : this.max
        const left = Math.round( (minValue - this.min) * (this.width - this.height) / this.range )
        const right = Math.round( (this.max - maxValue) * (this.width - this.height) / this.range )

        this.state = {
            minValue,
            maxValue,
            isError: false,
            leftOffset: left,
            rightOffset: right,
            left,
            right,
            leftPressed: false,
            rightPressed: false,
            over: true,
            reset: props.reset
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.reset !== props.reset) {
            let min = props.min || 0
            let max = props.max || 100

            return {
                ...state,
                minValue: min,
                maxValue: max,
                left: 0,
                right: 0,
                leftOffset: 0,
                rightOffset: 0,
                reset: props.reset
            }
        }
        return null
    }

    onMouseDown(e, side) {
        e.preventDefault()
        if (side === 'left') {
            this.setState({ leftPressed: true, over: false })
            this.startX = e.clientX
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else {
            this.setState({ rightPressed: true, over: true })
            this.startX = e.clientX
            document.addEventListener('mousemove', this.onMouseMoveRight)
            document.addEventListener('mouseup', this.onMouseUpRight)
        }
    }

    onMouseMove(e) {
        e.preventDefault()
        let { right } = this.state,
            width = this.width - this.height,
            endX = e.clientX - this.startX,
            leftOffset = this.state.leftOffset + endX,
            minValue = Math.round(this.range / width * leftOffset) + this.min,
            step = width / this.stepsCount

        leftOffset = Math.round(leftOffset / step) * step

        this.setState({ minValue, left: leftOffset })

        if (leftOffset < 0) {
            this.setState({ minValue: this.min, left: 0 })
        } else if (leftOffset > width - right) {
            this.setState({ minValue: this.state.maxValue, left: width - right })
        }
    }

    onMouseUp(e) {
        let { left, right } = this.state

        this.setState({ leftPressed: false })

        if (left < 0) {
            this.setState({ leftOffset: 0, left: 0 })
        } else if (left > (this.width - right)) {
            this.setState({ leftOffset: this.width, left: this.width })
        } else {
            this.setState({ leftOffset: left })
        }
        if (this.props.onChange) this.props.onChange({ min: this.state.minValue, max: this.state.maxValue })

        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onMouseMoveRight(e) {
        e.preventDefault()
        let { left } = this.state,
            width = this.width - this.height,
            endX = e.clientX - this.startX,
            rightOffset = this.state.rightOffset - endX,
            maxValue = ( this.max - Math.round(this.range / width * rightOffset) ) + this.min - this.min,
            step = width / this.stepsCount

        rightOffset = Math.round(rightOffset / step) * step

        this.setState({ maxValue, right: rightOffset })

        if (rightOffset < 0) {
            this.setState({ maxValue: this.max, right: 0 })
        } else if (rightOffset > width - left) {
            this.setState({ maxValue: this.state.minValue, right: width - left })
        }
    }

    onMouseUpRight(e) {
        let { right } = this.state

        this.setState({ rightPressed: false })

        if (right < 0) {
            this.setState({ rightOffset: 0, right: 0 })
        } else if (right > this.width) {
            this.setState({ rightOffset: this.width, right: this.width })
        } else {
            this.setState({ rightOffset: right })
        }
        if (this.props.onChange) this.props.onChange({ min: this.state.minValue, max: this.state.maxValue })
        document.removeEventListener('mousemove', this.onMouseMoveRight)
        document.removeEventListener('mouseup', this.onMouseUpRight)
    }

    // clickOnBar(e) {
    //     let barLeft = this.slider.current.getBoundingClientRect().left,
    //         x = e.clientX,
    //         leftOffset = x - barLeft - (this.state.height / 2),
    //         { min, max, width } = this.state,
    //         value = Math.round((max - min) / width * leftOffset) + min

    //     if (this.props.onChange) this.props.onChange(value)

    //     this.setState({ value, leftOffset, left: leftOffset })
    // }

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

        this.setState({ left, value, leftOffset: left })

        if (this.props.onChange) this.props.onChange({ min: value.minValue, max: value.maxValue })
    }

    render() {
        const { left, right, leftPressed, rightPressed, minValue, maxValue, isError, over } = this.state
        const showTootip = left + right > this.width - this.height - 50
        return (
            <Block>
                {
                    this.props.input && (
                        <Input
                            type='number'
                            min={this.min}
                            max={this.max}
                            value={String(minValue)}
                            onChange={this.handleInput}
                            isError={isError}
                        />
                    )
                }
                <Slide
                    ref={this.slider}
                    width={this.width}
                    height={this.height}
                >
                    {/* <StartValue>{this.min}</StartValue>
                    <StartValue right={true} >{this.max}</StartValue> */}
                    <Selector
                        width={this.height}
                        left={left}
                        onMouseDown={(e) => this.onMouseDown(e, 'left')}
                    >
                        { !showTootip && <Tooltip>{minValue}</Tooltip> }
                        <KnobLeft
                            width={this.height}
                            pressed={leftPressed}
                            idle={left === 0}
                            over={over}
                        />
                    </Selector>

                    <Selector
                        width={this.height}
                        right={right}
                        onMouseDown={(e) => this.onMouseDown(e, 'right')}
                    >
                        { !showTootip && <Tooltip>{maxValue}</Tooltip> }
                        <KnobRight
                            width={this.height}
                            pressed={rightPressed}
                            idle={right === 0}
                            over={over}
                        />
                    </Selector>

                    <Bar
                        // onClick={(e) => this.clickOnBar(e)}
                        margin={this.height / 2}
                    >
                        <Progress left={left} right={right}>
                            { showTootip && <TooltipMiddle><div>{minValue} - {maxValue}</div></TooltipMiddle> }
                        </Progress>
                    </Bar>
                </Slide>
                {
                    this.props.input && (
                        <Input
                            type='number'
                            min={this.min}
                            max={this.max}
                            value={String(maxValue)}
                            onChange={this.handleInput}
                            isError={isError}
                        />
                    )
                }
            </Block>
        )
    }
}

SliderRange.propTypes = {
    min: PropTypes.number,
    max: PropTypes.number,
    initialValue: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number
    }),
    label: PropTypes.string
}

SliderRange.defaultProps = {
    reset: false,
    onChange: () => {}
}

export default SliderRange
