import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';

const Dropbox = ({ renderTarget, renderDropdown, theme }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({});
  const target = useRef();
  const dropdown = useRef();

  useEffect(() => {
    setDropdownPosition();
  }, []);

  const setDropdownPosition = () => {
    const rect = target.current.getBoundingClientRect();
    const maxWidth = target.current.firstChild.getBoundingClientRect().width;
    const p = { left: 0, right: null, maxWidth };
    if (rect.x + 200 > window.innerWidth) {
      p.left = null;
      p.right = '0';
    }
    if (rect.bottom + 300 > window.innerHeight) {
      p.bottom = 30;
    }
    setPosition(p);
  };

  const show = () => {
    setDropdownPosition();
    if (!visible) {
      setVisible(true);
      document.addEventListener('click', hide);
      window.addEventListener('blur', blur);
    }
  };

  const blur = () => {
    setVisible(false);
    document.removeEventListener('click', hide);
    window.removeEventListener('blur', blur);
  };

  const hide = e => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setVisible(false);
    }
    if (!dropdown.current) {
      document.removeEventListener('click', hide);
      window.removeEventListener('blur', blur);
    }
  };

  const close = () => {
    setVisible(false);
    document.removeEventListener('click', hide);
    window.removeEventListener('blur', blur);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box ref={target}>
        {renderTarget({ show, close })}
        {visible && (
          <Drop position={position} ref={dropdown}>
            {renderDropdown({ close })}
          </Drop>
        )}
      </Box>
    </ThemeProvider>
  );
};

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
