import React, { FC, ReactNode } from 'react';
import styled, { withTheme } from 'styled-components';
import { styles } from '../../theme';

type Props = {
  isWide?: boolean;
  renderHeader?: () => ReactNode;
  renderMenu?: () => ReactNode;
  size?: number;
  theme: any
};

const SideBar: FC<Props> = ({
  isWide = false,
  renderHeader,
  renderMenu,
  size,
  theme = styles
}) => {
  return (
    <Container isWide={isWide} size={size || 270}>
      <div>
        {renderHeader && renderHeader()}
        {renderMenu && renderMenu()}
      </div>
    </Container>
  );
};

export default withTheme(SideBar);

const Container = styled.div<{ isWide: boolean; size: number }>`
  height: 100vh;
  width: ${props => (props.isWide ? `${props.size}px` : '0px')};
  z-index: 20;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.7s cubic-bezier(0.86, 0, 0.07, 1);
  background: ${props => props.theme.colors.primary};
  & > div {
    width: ${props => props.size};
  }
`;
