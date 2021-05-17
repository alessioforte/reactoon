import React, { FC, ReactNode } from 'react';
import styled, { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import useDropdown from './useDropdown';

interface Props {
  renderTarget: (props: any) => ReactNode;
  renderDropdown: (props: any) => ReactNode;
  theme: any;
}

const Dropbox: FC<Props> = ({
  renderTarget,
  renderDropdown,
  theme = Theme.styles
}) => {
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

export default withTheme(Dropbox);

const Box = styled.div<{ ref: any }>`
  position: relative;
  display: inline-block;
`;
const Drop = styled.div.attrs(({ position }: any) => ({ style: position }))<{
  ref: any;
  position: any;
}>`
  border-radius: ${props => `${props.theme.border.radius}px`};
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
