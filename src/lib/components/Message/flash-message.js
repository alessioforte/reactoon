import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Div } from 'glamorous';

class FlashMessage extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      time: null
    };

    this.clear = this.clear.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.props.content) {
      this.clear();
      var time = setTimeout(this.clear, 3000);

      this.setState({
        show: true,
        time: time
      });
    }
  }

  clear() {
    if (this.state.time) clearTimeout(this.state.time);

    this.setState({
      show: false,
      time: null
    });
  }

  render() {
    return (
      <Container>
        {this.state.show ? (
          <Message
            header={this.props.header || null}
            content={this.props.content || null}
            type={this.props.type || null}
          />
        ) : null}
      </Container>
    );
  }
}

const Message = props => {
  return <Box>{props.content}</Box>;
};

const Container = styled.div`
  margin: 9px 0;
  width: 100%;
  height: 60px;
`;
const animation = keyframes`
  0% {
    width: 0;
    opacity: 0;
    color: lightgreen;
  }
  50% {
    opacity: 0.5;
  }
  95% {
    color: lightgreen;
  }
  100% {
    color: white;
    width: 100%;
    opacity: 1;
  }
`;
const Box = styled.div`
  margin: 9px auto 0;
  background: lightgreen;
  padding: 9px;
  border-radius: 3px;
  border: 1px solid green;
  text-align: center;
  animation-name: ${animation};
  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-direction: normal;
  animation-fill-mode: forwards;
  animation-play-state: running;
`;
