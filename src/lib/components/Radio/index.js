import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import { focus } from '../Styled/css';

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
    const { theme, name, label } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <div>
          {label && <Placeholder>{label}</Placeholder>}
          <Options inline={this.inline}>
            {this.options.map((option, i) => (
              <label key={`${option.label}-${i}`}>
                <input
                  type='radio'
                  name={name}
                  value={option.value}
                  tabIndex='-1'
                />
                <Option
                  onClick={e => this.onChange(e, option.value)}
                  active={this.state.value === option.value}
                >
                  <div className='selector' tabIndex='0' />
                  <span>{option.label}</span>
                </Option>
              </label>
            ))}
          </Options>
        </div>
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
const Placeholder = styled.span`
  font-weight: bold;
`
const Options = styled.div`
  display: flex;
  flex-direction: ${props => (props.inline ? 'row' : 'column')};
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
`;
const Option = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 5px 0 0;
  cursor: pointer;
  .selector {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${props => props.theme.colors.background};
    transition: all 0.3s ease;
    &:hover {
        opacity: 0.8;
    }
    &:focus {
      ${focus}
    }
    &:after {
      content: '';
      width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${props =>
          props.active
            ? props.theme.colors.primary
            : props.theme.colors.ground};
    }
  }
  span {
    margin-left: 5px;
    display: inline-block;
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  }
`;
