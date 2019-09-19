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

    this.target = React.createRef();
    this.dropdown = React.createRef();
    this.hide = this.hide.bind(this);
    this.blur = this.blur.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    this.setDropdownPosition();
  }

  setDropdownPosition() {
    const rect = this.target.current.getBoundingClientRect();
    const maxWidth = this.target.current.firstChild.getBoundingClientRect()
      .width;
    let position = {
      left: 0,
      right: null,
      maxWidth
    };

    if (rect.x + 200 > window.innerWidth) {
      position.left = null;
      position.right = '0';
    }

    if (rect.bottom + 300 > window.innerHeight) {
      position.top = null;
      position.bottom = 30;
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
    var rect = this.dropdown.current.getBoundingClientRect();
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
    const { theme, renderTarget, renderDropdown } = this.props;
    const { visible, position } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box ref={this.target}>
          {renderTarget({ show: this.show, close: this.close })}
          {visible && (
            <Drop position={position} ref={this.dropdown}>
              {renderDropdown({ close: this.close })}
            </Drop>
          )}
        </Box>
      </ThemeProvider>
    );
  }
}

Dropbox.propTypes = {
  renderTarget: PropTypes.func,
  renderDropdown: PropTypes.func,
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
  margin: 5px 0;
  font-size: 12px;
  min-width: 200px;
  width: 100%;
  z-index: 9;
  &::-webkit-scrollbar {
    display: none;
  }
`;
