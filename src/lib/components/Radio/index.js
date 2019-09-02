import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';

class Radio extends Component {
  constructor(props) {
    super(props);

    this.options = props.options;
    this.inline = props.inline;

    const value = this.props.options[0].value;

    this.state = {
      value
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.options !== nextProps.options) {
      this.setState({ value: nextProps.options[0].value });
    }
    return true;
  }

  onChange(e, value) {
    this.setState({ value });
    this.props.onChange(value);
  }

  render() {
    const { theme } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Block inline={this.inline}>
          {this.options.map((option, i) => (
            <div key={`${option.label}-${i}`}>
              <Option onClick={e => this.onChange(e, option.value)}>
                <Selector active={this.state.value === option.value}>
                  <div />
                </Selector>
                <Label>{option.label}</Label>
              </Option>
            </div>
          ))}
        </Block>
      </ThemeProvider>
    );
  }
}

Radio.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  inline: PropTypes.bool
};

Radio.defaultProps = {
  inline: false,
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Radio);

/* eslint-disable */
const Block = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
`;
const Option = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 5px 0 0 0;
  cursor: pointer;
`;
const Selector = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.background};
    /* border: 1px solid ${props =>
      props.active
        ? props.theme.colors.active
        : props.theme.colors.background}; */
    transition: all 0.3s ease;
    &:hover {
        opacity: 0.8;
    }
    & > div {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${props =>
          props.active
            ? props.theme.colors.primary
            : props.theme.colors.ground};
    }
`;
const Label = styled.div`
  margin-left: 10px;
  font-size: 12px;
  display: inline-block;
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
`;
