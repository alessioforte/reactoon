import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';

class Dropbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      position: {}
    };

    this.input = React.createRef();
    this.drop = React.createRef();
    this.hide = this.hide.bind(this);
    this.blur = this.blur.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.setDropdownPosition();
  }

  setDropdownPosition() {
    const rect = this.input.current.getBoundingClientRect();
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
    var rect = this.drop.current.getBoundingClientRect();
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

  render() {
    const { theme, renderInput, renderOptions } = this.props;
    const { visible, position } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box ref={this.input}>
          {renderInput({ show: this.show })}
          {visible && (
            <Drop position={position} ref={this.drop}>
              {renderOptions({ close: this.close })}
            </Drop>
          )}
        </Box>
      </ThemeProvider>
    );
  }
}

Dropbox.propTypes = {
  renderInput: PropTypes.func,
  renderOptions: PropTypes.func,
  theme: PropTypes.object
};

Dropbox.defaultProps = {
  theme: Theme.styles
};

export default withTheme(Dropbox);

// prettier-ignore
const Box = styled.div`
  position: relative;
`
const Drop = styled.div.attrs(({ position }) => ({ style: position }))`
  border-radius: ${props => props.theme.border.radius + 'px'};
  position: absolute;
  background: ${props => props.theme.colors.background};
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
  padding: 5px 0;
  font-size: 12px;
  min-width: 200px;
  width: 100%;
  z-index: 9;
  &::-webkit-scrollbar {
    display: none;
  }
`;
