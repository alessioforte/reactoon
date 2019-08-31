import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../../theme';

/* eslint-disable */
class InfiniteScroll extends Component {
  constructor() {
    super();

    let children = [];
    for (let i = 0; i < 20; i++) {
      children.push(i);
    }

    this.state = {
      scroll: 0,
      children
    };

    this.container = React.createRef();
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    let scroll = 33 * 5 - 3;
    this.setState({ scroll });
    this.container.current.scrollLeft = scroll;
  }

  handleOnScroll(e) {
    let scroll = e.nativeEvent.target.scrollLeft;
    let children = this.state.children;

    if (scroll < 1) {
      let arr = [];
      let n = children[0];
      for (let i = n - 10; i < n; i++) {
        arr.push(i);
      }

      children.splice(0, 0, ...arr);
      children.splice(20, 10);
      this.container.current.scrollLeft = 326;
      this.setState({ children });
    }

    if (scroll >= 327) {
      let arr = [];
      let n = children[this.state.children.length - 1] + 1;
      for (let i = n; i < n + 10; i++) {
        arr.push(i);
      }
      children.splice(20, 0, ...arr);
      children.splice(0, 10);
      this.container.current.scrollLeft = 1;
      this.setState({ children });
    }
  }

  render() {
    const { children } = this.state;

    return (
      <Container onScroll={this.handleOnScroll} ref={this.container}>
        {children.map(item => (
          <Box key={item} onClick={() => console.log(item)}>
            {item}
          </Box>
        ))}
      </Container>
    );
  }
}

export default InfiniteScroll;

const Container = styled.div`
  position: relative;
  display: flex;
  max-width: 334px;
  background: #999;
  overflow: scroll;
  height: 36px;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background: #333;
  color: #fff;
  margin: 3px 3px 3px 0;
  flex-shrink: 0;
  font-size: 12px;
  &:hover {
    cursor: pointer;
    background: ${theme.primary};
  }
`;
