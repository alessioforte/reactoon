import React, { Component } from 'react';
import styled from 'styled-components';

class Menu extends Component {
  constructor() {
    super();

    this.hide = this.hide.bind(this);
    this.blur = this.blur.bind(this);
    this.over = this.over.bind(this);
    this.dropdowns = [];

    this.state = {
      visible: [false, false, false],
      over: false
    };

    this.obj = [
      {
        title: 'menu 1',
        items: ['item 1', 'item 2', 'item 3']
      },
      {
        title: 'menu 2',
        items: ['item 1', 'item 2', 'item 3']
      },
      {
        title: 'menu 3',
        items: ['item 1', 'item 2', 'item 3']
      }
    ];
  }

  show(e, i) {
    this.setState({ over: true });
    let visible = [false, false, false];
    visible[i] = true;
    this.setState({ visible, index: i });
    document.addEventListener('click', this.hide);
    window.addEventListener('blur', this.blur);
    let dropdown = e.target.nextSibling;
    let rect = dropdown.getBoundingClientRect();
    this.setState({ rect });
  }

  over(e, i) {
    if (this.state.over) {
      let visible = [false, false, false];
      visible[i] = true;
      this.setState({ visible, index: i });
      document.addEventListener('click', this.hide);
      window.addEventListener('blur', this.blur);
      let dropdown = e.target.nextSibling;
      let rect = dropdown.getBoundingClientRect();
      this.setState({ rect });
    }
  }

  hide(e) {
    let rect = this.dropdowns[this.state.index].getBoundingClientRect();
    let x = e.clientX;
    let y = e.clientY;

    if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
      this.setState({ visible: false, over: false });
      document.removeEventListener('click', this.hide);
      window.removeEventListener('blur', this.blur);
    }
  }

  blur() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  render() {
    return (
      <Bar>
        {this.obj.map((obj, i) => {
          return (
            <div key={i}>
              <div
                className={
                  this.state.visible[i]
                    ? 'menu-dropdown menu-active'
                    : 'menu-dropdown'
                }
                onClick={e => this.show(e, i)}
                onMouseOver={e => this.over(e, i)}
              >
                {obj.title}
              </div>

              <DropWindow
                ref={elm => this.dropdowns.push(elm)}
                style={{
                  display: this.state.visible[i] ? 'block' : 'none'
                }}
              >
                <DropList>
                  {obj.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </DropList>
              </DropWindow>
            </div>
          );
        })}
      </Bar>
    );
  }
}

const Bar = styled.div`
  display: flex;
  background: #1a1a1a;
`;
const DropWindow = styled.div`
  border-radius: 0 0 4px 4px;
  background: #fff;
  color: #000;
  box-shadow: 0px 5px 30px 1px rgba(0, 0, 0, 0.5);
  position: absolute;
  font-size: 16px;
  width: 250px;
  overflow: scroll;
  z-index: 3;
`;
const DropList = styled.div`
  & li {
    list-style-type: none;
    margin: 0;
    padding: 9px;
  }
  & li:hover {
    background: #2182bd;
    color: white;
    cursor: default;
  }
`;

export default Menu;
