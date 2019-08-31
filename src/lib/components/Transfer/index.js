import React, { Component } from 'react';
import styled from 'styled-components';
// import { Icon, Checkbox } from 'semantic-ui-react'
import { colors } from 'theme';
import Checkbox from './components/checkbox/checkbox';

class Transfer extends Component {
  constructor(props) {
    super(props);

    let leftItems = props.dataSource || [];
    let rightItems = props.dataTarget || [];

    this.state = {
      leftItems,
      rightItems,
      leftSelected: [],
      rightSelected: []
    };
  }

  selectItem(data, side) {
    let selected;
    if (side === 'left') selected = this.state.leftSelected;
    else selected = this.state.rightSelected;

    if (data.checked) selected.push(data.label);
    else selected = selected.filter(item => item !== data.label);

    if (side === 'left') this.setState({ leftSelected: selected });
    else this.setState({ rightSelected: selected });
  }

  moveTo(side) {
    let rightItems = this.state.rightItems;
    let leftItems = this.state.leftItems;
    let leftSelected = this.state.leftSelected;
    let rightSelected = this.state.rightSelected;

    if (side === 'left') {
      rightItems = rightItems.filter(item => !rightSelected.includes(item));
      leftItems = leftItems.concat(this.state.rightSelected);
    } else {
      leftItems = leftItems.filter(item => !leftSelected.includes(item));
      rightItems = rightItems.concat(this.state.leftSelected);
    }

    this.setState({
      rightItems,
      leftItems,
      leftSelected: [],
      rightSelected: []
    });

    this.handleChange(leftItems, rightItems);
  }

  shiftTo(direction) {
    let rightSelected = this.state.rightSelected;

    if (rightSelected.length === 1) {
      let rightItems = this.state.rightItems;
      let index = rightItems.indexOf(rightSelected[0]);

      if (direction === 'up')
        index = (index + rightItems.length - 1) % rightItems.length;
      else index = (index + 1) % rightItems.length;

      rightItems = rightItems.filter(item => !rightSelected.includes(item));
      rightItems.splice(index, 0, rightSelected[0]);

      this.setState({ rightItems });
      this.handleChange(this.state.leftItems, rightItems);
    }
  }

  handleChange(dataSource, dataTarget) {
    this.props.onChange(dataSource, dataTarget);
  }

  render() {
    const { leftItems, leftSelected, rightItems, rightSelected } = this.state;

    return (
      <Tables>
        <Box>
          <Table>
            {leftItems.map((item, idx) => {
              return (
                <Item key={`${idx}-leftItem`}>
                  <Checkbox
                    onChange={(e, data) => this.selectItem(data, 'left')}
                    label={item}
                    checked={leftSelected.includes(item)}
                  />
                </Item>
              );
            })}
          </Table>
          <Buttons>
            <Button
              disabled={leftSelected.length === 0}
              onClick={() =>
                leftSelected.length !== 0 ? this.moveTo('right') : null
              }
            >
              <Icon name='arrow right' />
            </Button>
            <Button
              disabled={rightSelected.length === 0}
              onClick={() =>
                rightSelected.length !== 0 ? this.moveTo('left') : null
              }
            >
              <Icon name='arrow left' />
            </Button>
          </Buttons>
        </Box>
        <Box>
          <Table>
            {rightItems.map((item, idx) => {
              return (
                <Item key={`${idx}-rightItem`}>
                  <Checkbox
                    onChange={(e, data) => this.selectItem(data, 'right')}
                    label={item}
                    checked={rightSelected.includes(item)}
                  />
                </Item>
              );
            })}
          </Table>
          <Buttons>
            <Button
              disabled={rightSelected.length !== 1 || rightItems.length === 1}
              onClick={() => this.shiftTo('up')}
            >
              <Icon name='arrow up' />
            </Button>
            <Button
              disabled={rightSelected.length !== 1 || rightItems.length === 1}
              onClick={() => this.shiftTo('down')}
            >
              <Icon name='arrow down' />
            </Button>
          </Buttons>
        </Box>
      </Tables>
    );
  }
}

const Tables = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  max-width: 1200px;
`;
const Table = styled.div`
  border: 1px solid lightgray;
  border-radius: 5px;
  min-height: 300px;
  width: 90%;
  margin: 10px;
`;
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 10%;
`;
const Item = styled.div`
  padding: 5px;
  &:hover {
    background: ${colors.background};
  }
`;
const Button = styled.div`
  background: ${colors.background};
  border-radius: 5px;
  padding: 1px 0 1px 4px;
  margin: 5px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    background: ${props => (props.disabled ? colors.background : '#ddd')};
  }
`;
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Transfer;
