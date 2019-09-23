import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles } from '../../theme';

const SIZE = {
  width: 300,
  height: 32
};
class Slider extends Component {
  constructor(props) {
    super(props);

    this.min = props.min || 0;
    this.max = props.max || 100;
    this.range = this.max - this.min;
    this.stepsCount = this.max - this.min;
    this.step = 100 / (this.max - this.min);
    this.height = SIZE.height;
    this.width = SIZE.width;
    this.unit = this.width / 100;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDownRight = this.onMouseDownRight.bind(this);
    this.onMouseMoveRight = this.onMouseMoveRight.bind(this);
    this.onMouseUpRight = this.onMouseUpRight.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.slider = React.createRef();

    const value = props.initialValue ? props.initialValue[0] : this.min;
    const maxValue = props.initialValue ? props.initialValue[1] : this.max;
    const left = (100 / this.range) * (value - this.min);
    const right = (100 / this.range) * (maxValue - this.min);

    this.state = {
      value,
      maxValue,
      offset: 0,
      rightOffset: 0,
      left,
      right,
      isError: false,
      over: true,
      reset: props.reset || false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.reset !== props.reset) {
      return {
        ...state,
        value: props.min,
        maxValue: props.max,
        left: 0,
        right: 100,
        leftOffset: 0,
        rightOffset: 0,
        reset: props.reset
      };
    }
    return null;
  }

  setSize() {
    const rect = this.slider.current.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.unit = this.width / 100;
    const { left, right } = this.state;
    const offset = this.unit * left;
    const rightOffset = this.unit * (100 - right);
    this.setState({ offset, rightOffset });
  }

  componentDidMount() {
    this.setSize();
  }

  onMouseDown(e) {
    e.preventDefault();
    this.startX = e.clientX;
    this.setState({ over: false });
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseDownRight(e) {
    e.preventDefault();
    this.startX = e.clientX;
    this.setState({ over: true });
    document.addEventListener('mousemove', this.onMouseMoveRight);
    document.addEventListener('mouseup', this.onMouseUpRight);
  }

  onMouseMove(e) {
    e.preventDefault();
    let { right } = this.state;
    let endX = e.clientX - this.startX;
    let offset = this.state.offset + endX;
    let value = Math.round((this.range / this.width) * offset) + this.min;
    let left =
      Math.round(((100 / this.width) * offset) / this.step) * this.step;
    this.setState({ value, left });

    if (left < 0) {
      this.setState({ value: this.min, left: 0 });
    } else if (left > right) {
      this.setState({ value: this.state.maxValue, left: right });
    }
  }

  onMouseUp(e) {
    let { left } = this.state;
    if (left < 0) {
      this.setState({ offset: 0, left: 0 });
    } else if (left > 100) {
      this.setState({ offset: this.width, left: 100 });
    } else {
      this.setState({ offset: (left * this.width) / 100 });
    }

    if (this.props.range) {
      this.props.onChange({
        name: this.props.name,
        range: [this.min, this.max],
        value: [this.state.value, this.state.maxValue]
      });
    } else {
      this.props.onChange({
        name: this.props.name,
        range: [this.min, this.max],
        value: this.state.value
      });
    }

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  onMouseMoveRight(e) {
    e.preventDefault();
    let { left } = this.state;
    let endX = e.clientX - this.startX;
    let rightOffset = this.state.rightOffset - endX;
    let maxValue =
      this.max -
      Math.round((this.range / this.width) * rightOffset) +
      this.min -
      this.min;
    let right =
      Math.round((100 - (100 / this.width) * rightOffset) / this.step) *
      this.step;

    this.setState({ maxValue, right });

    if (right < left) {
      this.setState({ maxValue: this.state.value, right: left });
    } else if (right > 100) {
      this.setState({ maxValue: this.max, right: 100 });
    }
  }

  onMouseUpRight(e) {
    let { right } = this.state;
    if (right < 0) {
      this.setState({ rightOffset: 0, right: 0 });
    } else if (right > 100) {
      this.setState({ rightOffset: this.width, right: 100 });
    } else {
      this.setState({ rightOffset: this.width - (right * this.width) / 100 });
    }

    this.props.onChange({
      name: this.props.name,
      range: [this.min, this.max],
      value: [this.state.value, this.state.maxValue]
    });

    document.removeEventListener('mousemove', this.onMouseMoveRight);
    document.removeEventListener('mouseup', this.onMouseUpRight);
  }

  handleInput(e) {
    let width = this.width - this.height;
    let value = Number(e.target.value);
    let left = 0;

    if (isNaN(value)) return;

    if (value < this.min) {
      this.setState({ isError: true });
    } else if (value > this.max) {
      left = width;
      this.setState({ isError: true });
    } else {
      left = (width * (value - this.min)) / this.range;
      this.setState({ isError: false });
    }

    this.setState({ left, value, offset: left });

    if (this.props.onChange) this.props.onChange(value);
  }

  render() {
    const { left, right, value, maxValue, over } = this.state;
    const { range, showTooltip } = this.props;
    const middleTootip = range && (right - left) * this.unit < this.height * 2;

    return (
      <Block>
        <Slide ref={this.slider}>
          <Selector
            left={left}
            onMouseDown={this.onMouseDown}
            idle={!range && left === 0}
            over={over}
          >
            {showTooltip && !middleTootip && <Tooltip>{value}</Tooltip>}
          </Selector>
          {range && (
            <Selector
              left={right}
              onMouseDown={this.onMouseDownRight}
              over={!over}
            >
              {showTooltip && !middleTootip && <Tooltip>{maxValue}</Tooltip>}
            </Selector>
          )}
          <Bar margin={this.height / 2}>
            {range ? (
              <Progress left={left} right={100 - right}>
                {showTooltip && middleTootip && (
                  <TooltipMiddle>
                    <div>
                      {value} - {maxValue}
                    </div>
                  </TooltipMiddle>
                )}
              </Progress>
            ) : (
              <Progress left={0} right={100 - left} />
            )}
          </Bar>
        </Slide>
      </Block>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  range: PropTypes.bool,
  showTootip: PropTypes.bool
};

Slider.defaultProps = {
  min: 0,
  max: 100,
  onChange: value => console.log(value),
  range: false,
  showTootip: false,
  theme: styles
};

export default Slider;

const Block = styled.div`
  position: relative;
  display: inline-flex;
  height: 30px;
  width: 100%;
  margin-top: 30px;
`;
const Slide = styled.div`
  box-sizing: border-box;
  height: ${SIZE.height}px;
  width: calc(100% - ${SIZE.height}px);
  position: relative;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bar = styled.div`
  position: relative;
  margin-left: ${props => props.margin + 'px'};
  margin-right: ${props => -props.margin + 'px'};
  height: 5px;
  border-radius: 2.5px;
  background: ${props => props.theme.colors.ground};
  width: 100%;
`;
const Selector = styled.div.attrs(props => ({
  style: { left: props.left + '%' }
}))`
  width: ${SIZE.height}px;
  height: ${SIZE.height}px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  color: white;
  &::after {
    content: '';
    position: absolute;
    background: ${props =>
      props.idle ? props.theme.colors.ground : props.theme.colors.primary};
    width: ${SIZE.height / 2}px;
    height: ${SIZE.height / 2}px;
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.1s ease-out;
    z-index: ${props => (props.over ? '1' : '2')};
  }
  &:active {
    &::after {
      width: ${SIZE.height}px;
      height: ${SIZE.height}px;
      background: ${props => props.theme.colors.primary};
    }
  }
`;
const Tooltip = styled.div`
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
`;
const TooltipMiddle = styled.div`
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
`;
const Progress = styled.div.attrs(({ left, right }) => ({
  style: { left: left + '%', right: right + '%' }
}))`
  height: 100%;
  position: absolute;
  background: ${props => props.theme.colors.primary};
  border-radius: 2.5px;
  -webkit-box-shadow: inset 0px 0px 6px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 6px 3px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 6px 3px rgba(0, 0, 0, 0.3);
`;
