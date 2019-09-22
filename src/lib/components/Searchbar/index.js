import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Icon from '../Icon';
import Theme, { getContrastYIQ } from '../../theme/';

const Searchbar = ({
  suggestions,
  onChange,
  onSearch,
  onClear,
  delay,
  theme
}) => {
  const [showClear, setShowClear] = useState(false);
  const [showTips, setShowTips] = useState(true);
  const [tipIndex, setTipIndex] = useState(-1);
  const input = React.createRef();
  const searchbar = React.createRef();
  let timeout = null;

  const clearInput = () => {
    input.current.value = '';
    setShowClear(false);
    setShowTips(false);
    setTipIndex(-1);
    onChange('');
    onClear();
  };

  const handleInputKeyDown = e => {
    let i = -1;
    let length = suggestions.length;

    switch (e.key) {
      case 'ArrowDown':
        if (showTips) {
          i = (tipIndex + 1) % length;
          input.current.value = suggestions[i].label;
        }
        break;
      case 'ArrowUp':
        if (showTips) {
          i = (tipIndex + length - 1) % length;
          input.current.value = suggestions[i].label;
        }
        break;
      case 'Escape':
        setShowTips(false);
        onChange(input.current.value);
        break;
      default:
        break;
    }

    clearTimeout(timeout);
    setTipIndex(i);
  };

  const handleInputChange = e => {
    const { value } = e.target;
    const search = value.toLowerCase().trim();

    if (!value) {
      clearInput();
      onChange(search);
      return;
    } else {
      setShowClear(true);
      setShowTips(true);
    }

    if (search) {
      timeout = setTimeout(() => {
        onChange(search);
      }, delay);
    }
  };

  const handleSelection = value => {
    input.current.value = value;
    input.current.focus();
    onChange(value);
    setShowTips(false);
    window.removeEventListener('click', hide);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let value = input.current.value;
    if (value) {
      onChange(value);
      onSearch(value);
    }
  };

  const hide = e => {
    if (searchbar.current) {
      var rect = searchbar.current.getBoundingClientRect();
      var x = e.clientX;
      var y = e.clientY;
      if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
        setShowTips(false);
        window.removeEventListener('click', hide);
      }
    } else {
      window.removeEventListener('click', hide);
    }
  };

  if (showTips) window.addEventListener('click', hide);
  else window.removeEventListener('click', hide);

  if (suggestions.length === 0 && showTips) {
    setShowTips(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Bar ref={searchbar}>
        <Input
          ref={input}
          type='text'
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        {showClear && (
          <Clear onClick={clearInput}>
            <Icon
              name='delete'
              size='8px'
              color={theme.colors[getContrastYIQ(theme.colors.primary)]}
            />
          </Clear>
        )}
        <Submit type='submit' onClick={handleSubmit}>
          <Icon
            name='search'
            size='15px'
            color={theme.colors[getContrastYIQ(theme.colors.primary)]}
          />
        </Submit>
        {showTips && (
          <Box>
            <List>
              {suggestions.map((item, i) => (
                <Tip
                  onClick={() => handleSelection(item.value)}
                  key={item.value}
                  hover={tipIndex === i}
                >
                  {item.value}
                </Tip>
              ))}
            </List>
          </Box>
        )}
      </Bar>
    </ThemeProvider>
  );
};

Searchbar.propTypes = {
  suggestions: PropTypes.array,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  delay: PropTypes.number
};

Searchbar.defaultProps = {
  suggestions: [],
  onChange: () => {},
  onSearch: () => {},
  onClear: () => {},
  delay: 300,
  theme: Theme.styles
};

export default withTheme(Searchbar);

/**
 * STYLES
 */

const Bar = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 28px;
  background: ${props => props.theme.colors.background};
`;
const Input = styled.input`
  flex-grow: 1;
  border: 0;
  min-height: 30px;
  padding-left: 10px;
  background: transparent;
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  font-size: 14px;
  z-index: 6;
  &:focus {
    outline: none;
  }
`;
const Box = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.2);
  z-index: 5;
`;
const List = styled.ul`
  background: ${props => props.theme.colors.background};
  margin-top: 30px;
  max-height: 300px;
  min-height: 28px;
  overflow-y: scroll;
  font-size: 14px;
  border-top: 1px solid ${props => props.theme.colors.ground};
`;
const Tip = styled.li`
  display: flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  list-style-type: none;
  margin: 0;
  ${props =>
    props.hover
      ? `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.text};`
      : null}
  &:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    cursor: default;
  }
`;
const Clear = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${props => props.theme.colors.ground};
  height: 18px;
  width: 18px;
  margin: 5px;
  z-index: 6;
  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }
`;
const Submit = styled.button`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #999;
  align-self: stretch;
  background: ${props => props.theme.colors.primary};
  min-width: 30px;
  z-index: 6;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
`;
