import React, { Component } from 'react';
import styled from 'styled-components';
import { Lines } from '../../icons';
import colors from '../../theme/colors';

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wide: false
    };
  }

  render() {
    const { wide } = this.state;
    const { children } = this.props;

    return (
      <Container wide={wide}>
        <Toggle onClick={() => this.setState({ wide: !wide })}>
          <Lines color='white' size={20} />
        </Toggle>
        {React.Children.map(children, (child, i) => (
          <div key={`sidebar-item-${i}`}>{child}</div>
        ))}
      </Container>
    );
  }
}

const Item = props => {
  return (
    <Box>
      <Icon>{props.icon}</Icon>
      {props.text && <Text>{props.text}</Text>}
      {props.children && <Text>{props.children}</Text>}
    </Box>
  );
};

SideBar.Item = Item;

export default SideBar;

const Container = styled.div`
  width: ${props => (props.wide ? '230px' : '50px')};
  flex-shrink: 0;
  background: #1a1a1a;
  z-index: 5;
  transition: all 0.3s ease;
  padding: 0 5px;
`;
const Toggle = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 20px;
`;
const Box = styled.div`
  box-sizing: border-box;
  min-width: 50px;
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  transition: all 0.3s ease;
  &:hover {
    background: ${colors.hover};
    border-radius: 25px;
    cursor: pointer;
  }
`;
const Text = styled.div`
  color: ${colors.text};
  transition: all 0.3s ease;
  padding-left: 10px;
  flex-shrink: 0;
`;
const Icon = styled.div`
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
