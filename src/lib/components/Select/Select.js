import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import Icon from '../Icon';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      value: null,
      text: null,
      placeholder: props.placeholder || 'select...',
      position: {}
    };

    this.dropdown = React.createRef();
    this.content = React.createRef();
    this.hide = this.hide.bind(this);
    this.blur = this.blur.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.setDropdownPosition();
  }

  setDropdownPosition() {
    let rect = this.dropdown.current.getBoundingClientRect();
    let position = {
      top: 35,
      left: '0',
      right: null,
      bottom: null
    };

    if (rect.x + 200 > window.innerWidth) {
      position.left = null;
      position.right = '0';
    }

    if (rect.bottom + 300 > window.innerHeight) {
      position.top = null;
      position.bottom = 35;
    }

    this.setState({ position });
  }

  show(e) {
    this.setDropdownPosition();

    if (!this.state.visible) {
      this.setState({ visible: true });
      document.addEventListener('click', this.hide);
      window.addEventListener('blur', this.blur);
    }
  }

  blur() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  hide(e) {
    var rect = this.content.current.getBoundingClientRect();
    var x = e.clientX;
    var y = e.clientY;
    if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
      this.setState({ visible: false });
      document.removeEventListener('click', this.hide);
      window.removeEventListener('blur', this.blur);
    }
  }

  close() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  select(item) {
    this.setState({
      visible: false,
      value: item.value,
      text: item.text
    });

    this.props.onChange(item.value);

    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  render() {
    const { options, isError, theme } = this.props;
    const { value, text, placeholder, visible, position } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Block ref={this.dropdown}>
          <Button
            onClick={this.show}
            value={value ? true : false}
            isError={isError}
          >
            {text ? text : placeholder}
            <IconBox>
              <Icon name='caret' size='5px' color={theme.colors.ground} />
            </IconBox>
          </Button>
          {visible && (
            <Drop position={position} ref={this.content}>
              {/* <Selected isText={text ? false : true}>
                                    {
                                        <li onClick={this.close}>{text ? text : placeholder}<IconBox><Icon name='caret' size={5} color={theme.colors[getContrastYIQ(theme.colors.background)]} /></IconBox></li>
                                    }
                                </Selected> */}
              <List reverse={position.top ? true : false}>
                {text && (
                  <Null
                    onClick={e => {
                      this.select({ text: null, value: null });
                    }}
                  >
                    {placeholder}
                  </Null>
                )}
                {options &&
                  options.map((item, i) => {
                    if (text === item.text) return null;
                    return (
                      <li
                        key={`${item.value}-${i}`}
                        onClick={e => {
                          this.select(item);
                        }}
                      >
                        {item.text}
                      </li>
                    );
                  })}
              </List>
            </Drop>
          )}
        </Block>
      </ThemeProvider>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

Select.defaultProps = {
  placeholder: 'select...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Select);

const Block = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  position: relative;
`;
const Button = styled.div`
  border-radius: ${props => props.theme.borders.radius + 'px'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  min-height: 30px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  border: 1px solid
    ${props =>
      props.isError ? props.theme.colors.error : props.theme.colors.background};
  color: ${props =>
    props.value
      ? props.theme.colors[getContrastYIQ(props.theme.colors.background)]
      : props.theme.colors.ground};
  padding: 0 10px;
  &:hover {
    border-color: ${props => props.theme.colors.ground};
  }
`;
const Drop = styled.div.attrs(({ position }) => ({ style: position }))`
  border-radius: ${props => props.theme.borders.radius + 'px'};
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 200px;
  width: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  border: 1px solid ${props => props.theme.colors.background};
  box-shadow: ${props => props.theme.colors.shadow};
  font-size: 12px;
  z-index: 9;
`;
const List = styled.div`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column' : 'column-reverse')};
  order: ${props => (props.reverse ? '0' : '-1')};
  overflow: scroll;
  max-height: 338px;
  li {
    border-radius: ${props => props.theme.borders.radius + 'px'};
    display: flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    list-style-type: none;
    margin: 0;
  }
  li:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.hover)]};
    cursor: default;
  }
`;
// const Selected = styled.div`
//     color: ${props => props.isText ? props.theme.colors.idle : props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
//     li {
//         display: flex;
//         align-items: center;
//         justify-content:space-between;
//         min-height: 28px;
//         padding: 0 10px;
//         list-style-type: none;
//     }
//     li:hover {
//         cursor: default;
//     }
// `
const Null = styled.li`
  color: ${props => props.theme.colors.idle};
`;
const IconBox = styled.div`
  min-width: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
