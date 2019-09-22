import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { styles } from '../../theme';
class Slider extends Component {
  constructor(props) {
    super(props);

    this.min = props.min || 0;
    this.max = props.max || 100;
    this.domain = this.max - this.min;
    this.stepsCount = this.max - this.min;
    this.step = 100 / (this.max - this.min);
    this.height = 30;
    this.width = props.width || 300;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseDownRight = this.onMouseDownRight.bind(this);
    this.onMouseMoveRight = this.onMouseMoveRight.bind(this);
    this.onMouseUpRight = this.onMouseUpRight.bind(this);
    this.clickOnBar = this.clickOnBar.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.slider = React.createRef();

    this.state = {
      value: this.min,
      maxValue: this.max,
      offset: 0,
      rightOffset: 0,
      left: 0,
      right: 100,
      isError: false,
      over: true
    };
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
    let value = Math.round((this.domain / this.width) * offset) + this.min;
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
      Math.round((this.domain / this.width) * rightOffset) +
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

  clickOnBar(e) {
    // let barLeft = this.slider.current.getBoundingClientRect().left,
    //   x = e.clientX,
    //   offset = x - barLeft - this.height / 2,
    //   value = Math.round((this.domain / this.width) * offset) + this.min;
    // if (this.props.onChange) this.props.onChange(value);
    // this.setState({ value, offset, left: offset });
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
      left = (width * (value - this.min)) / this.domain;
      this.setState({ isError: false });
    }

    this.setState({ left, value, offset: left });

    if (this.props.onChange) this.props.onChange(value);
  }

  render() {
    const { left, right, value, maxValue, over } = this.state;
    const { range, showTootip } = this.props;
    const middleTootip = range && right - left < 20;

    return (
      <Block>
        <Slide ref={this.slider} width={this.width} height={this.height}>
          <Selector
            width={this.height}
            left={left}
            onMouseDown={this.onMouseDown}
            idle={!range && left === 0}
            over={over}
          >
            {showTootip && !middleTootip && <Tooltip>{value}</Tooltip>}
          </Selector>
          {range && (
            <Selector
              width={this.height}
              left={right}
              onMouseDown={this.onMouseDownRight}
              over={!over}
            >
              {showTootip && !middleTootip && <Tooltip>{maxValue}</Tooltip>}
            </Selector>
          )}
          <Bar
            // onClick={this.clickOnBar}
            margin={((100 / this.width) * this.height) / 2}
          >
            {range ? (
              <Progress left={left} right={100 - right}>
                {showTootip && middleTootip && (
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
        {/* {this.props.input && (
          <Input
            type='number'
            min={this.min}
            max={this.max}
            value={String(value)}
            onChange={this.handleInput}
            isError={isError}
          />
        )} */}
      </Block>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string
};

Slider.defaultProps = {
  name: '',
  onChange: value => console.log(value),
  theme: styles
};

export default Slider;

const Block = styled.div`
  position: relative;
  display: inline-flex;
  height: 30px;
  width: 330px;
  margin-top: 30px;
`;
const Slide = styled.div`
  box-sizing: border-box;
  height: ${props => props.height + 'px'};
  width: ${props => props.width + 'px'};
  position: relative;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bar = styled.div`
  position: relative;
  margin-left: ${props => props.margin + '%'};
  margin-right: ${props => -props.margin + '%'};
  height: 5px;
  border-radius: 2.5px;
  background: ${props => props.theme.colors.background};
  width: 100%;
`;
const Selector = styled.div.attrs(props => ({
  style: { left: props.left + '%' }
}))`
  width: ${props => props.width}px;
  height: ${props => props.width}px;
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
    width: ${props => props.width / 2}px;
    height: ${props => props.width / 2}px;
    box-sizing: border-box;
    border-radius: 50%;
    transition: all 0.1s ease-out;
    z-index: ${props => (props.over ? '1' : '2')};
  }
  &:active {
    &::after {
      width: ${props => props.width}px;
      height: ${props => props.width}px;
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
// const StartValue = styled.div`
//   ${props => (props.right === true ? 'right: 0' : 'left: 0')};
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 18px;
//   background: #1a1a1a;
//   top: -20px;
//   padding: 0 3px;
//   border-radius: 3px;
//   color: white;
//   font-size: 12px;
// `;
// const BoxValue = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 18px;
//   background: #1a1a1a;
//   padding: 0 3px;
//   border-radius: 3px;
//   color: white;
//   font-size: 12px;
// `;
// const Input = styled.input`
//   font-size: 14px;
//   width: 40px;
//   margin-left: 6px;
//   text-align: left;
//   padding: 0;
//   border: 0;
//   background: none;
//   color: ${props => (props.isError ? props.theme.colors.error : '#fff')};
//   &:focus {
//     outline: none;
//   }
//   &[type='number']::-webkit-inner-spin-button {
//     -webkit-appearance: none;
//   }
// `;
