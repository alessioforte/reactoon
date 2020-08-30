import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import useDropdown from './useDropdown';

const Dropbox = ({ renderTarget, renderDropdown, theme }) => {
  const { open, close, position, target, dropdown, visible } = useDropdown();

  return (
    <ThemeProvider theme={theme}>
      <Box ref={target}>
        {renderTarget({ show: open, close })}
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
