import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Block, Slide, Bar, Selector, Knob, Input } from './styled';

class Slider extends Component {
  constructor(props) {
    super(props);

    this.min = props.min || 0;
    this.max = props.max || 100;
    this.range = this.max - this.min;
    this.height = 30;
    this.width = props.width || 300;
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.clickOnBar = this.clickOnBar.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.slider = React.createRef();

    this.state = {
      value: this.min,
      offset: 0,
      left: 0,
      pressed: false,
      isError: false
    };
  }

  onMouseDown(e) {
    e.preventDefault();
    this.setState({ pressed: true });
    this.startX = e.clientX;
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove(e) {
    e.preventDefault();
    let width = this.width - this.height,
      endX = e.clientX - this.startX,
      offset = this.state.offset + endX,
      value = Math.round((this.range / width) * offset) + this.min;

    this.setState({ value, left: offset });

    if (offset < 0) {
      this.setState({ value: this.min, left: 0 });
    } else if (offset > width) {
      this.setState({ value: this.max, left: width });
    }
  }

  onMouseUp(e) {
    let { left } = this.state;

    this.setState({ pressed: false });

    if (left < 0) {
      this.setState({ offset: 0, left: 0 });
    } else if (left > this.width) {
      this.setState({ offset: this.width, left: this.width });
    } else {
      this.setState({ offset: left });
    }
    if (this.props.onChange) this.props.onChange(this.state.value);

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  clickOnBar(e) {
    let barLeft = this.slider.current.getBoundingClientRect().left,
      x = e.clientX,
      offset = x - barLeft - this.height / 2,
      value = Math.round((this.range / this.width) * offset) + this.min;

    if (this.props.onChange) this.props.onChange(value);

    this.setState({ value, offset, left: offset });
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
    const { left, pressed, value, isError } = this.state;

    return (
      <Block>
        <Slide ref={this.slider} width={this.width} height={this.height}>
          <Selector
            width={this.height}
            left={left}
            onMouseDown={this.onMouseDown}
          >
            <Knob width={this.height} pressed={pressed} idle={left === 0} />
          </Selector>

          <Bar onClick={this.clickOnBar} margin={this.height / 2}>
            <Progress width={left} />
          </Bar>
        </Slide>
        {this.props.input && (
          <Input
            type='number'
            min={this.min}
            max={this.max}
            value={String(value)}
            onChange={this.handleInput}
            isError={isError}
          />
        )}
      </Block>
    );
  }
}

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string
};

export default Slider;

const Progress = styled.div.attrs(({ width }) => ({
  style: { width: width + 'px' }
}))`
  height: 100%;
  background: #2182bd;
  border-radius: 2.5px;
  opacity: 0.8;
  -webkit-box-shadow: inset 0px 0px 6px 3px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: inset 0px 0px 6px 3px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0px 0px 6px 3px rgba(0, 0, 0, 0.3);
`;
