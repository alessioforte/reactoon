import React from 'react';
import styled, { withTheme } from 'styled-components';

const SideBar = ({ isWide, renderHeader, renderMenu, size }) => {
  return (
    <Container isWide={isWide} size={size || '270px'}>
      <div>
        {renderHeader && renderHeader()}
        {renderMenu && renderMenu()}
      </div>
    </Container>
  )
}

export default withTheme(SideBar);

const Container = styled.div`
  height: 100vh;
  width: ${props => (props.isWide ? props.size : '0px')};
  z-index: 20;
  flex-shrink: 0;
  overflow: hidden;
  transition: all .7s cubic-bezier(.86,0,.07,1);
  background: ${props => props.theme.colors.primary};
  & > div {
    width: ${props => props.size};
  }
`;
