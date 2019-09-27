import React, { FC, ReactElement } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import Icon from '../Icon';
import { styles, getContrastYIQ } from '../../theme';

type Props = {
  label?: string,
  icon?: string,
  action?: (e: any) => void,
  theme: any
}

const Tag: FC<Props> = ({ label, icon, action, theme }) => {

  let tagIcon: any = null;
  if (icon && action) {
    tagIcon = (
      <IconTag onClick={action} pointer>
        <Icon
          name={icon}
          size='8px'
          color={theme.colors[getContrastYIQ(theme.colors.primary)]}
        />
      </IconTag>
    )
  }
  if (icon && !action) {
    tagIcon = (
      <IconTag>
        <Icon
          name={icon}
          size='8px'
          color={theme.colors[getContrastYIQ(theme.colors.primary)]}
        />
      </IconTag>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Badge>
        {label}{tagIcon}
      </Badge>
    </ThemeProvider>
  )
}

Tag.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string,
  action: PropTypes.func,
  theme: PropTypes.any
}

Tag.defaultProps = {
  label: '',
  theme: styles
}

export default withTheme(Tag);

const Badge = styled.div`
  color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  background: ${props => props.theme.colors.primary};
  display: inline-flex;
  padding: 3px 6px;
  margin: 1px;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;
const IconTag = styled.div<{pointer?: boolean}>`
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: ${props => props.pointer ? 'pointer' : 'default'};
`
