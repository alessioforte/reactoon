import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme from '../../theme';

class Toggle extends Component {
  constructor(props) {
    super(props);

    this.height = props.height;
    this.onChange = this.onChange.bind(this);

    this.state = {
      value: props.value
    };
  }

  onChange(e) {
    let value = !this.state.value;
    let data = { checked: value, label: this.props.label };
    this.props.onChange(e, data);
    this.setState({ value });
  }

  render() {
    const { label, theme } = this.props;
    const { value } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box>
          <Outer onClick={this.onChange} height={this.height}>
            <Inner
              active={value}
              left={value ? this.height : 0}
              style={{ transition: 'all 0.2s ease' }}
              size={this.height - 4}
            ></Inner>
          </Outer>
          {label && <Label>{label}</Label>}
        </Box>
      </ThemeProvider>
    );
  }
}

Toggle.propTypes = {
  height: PropTypes.number,
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

Toggle.defaultProps = {
  height: 20,
  value: false,
  label: null,
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Toggle);

const Box = styled.div`
  display: inline-flex;
  align-items: center;
`;
const Outer = styled.div`
  flex-shrink: 0;
  position: relative;
  height: ${props => props.height + 'px'};
  width: ${props => props.height * 2 + 'px'};
  border-radius: 20px;
  position: relative;
  background: ${props => props.theme.colors.background};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    opacity: 0.8;
  }
`;
const Inner = styled.div`
  height: ${props => props.size + 'px'};
  width: ${props => props.size + 'px'};
  background: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.ground};
  left: ${props => props.left + 'px'};
  border-radius: 50%;
  position: absolute;
  margin: 2px;
`;
const Label = styled.div`
  display: inline-block;
  margin-left: 5px;
`;
