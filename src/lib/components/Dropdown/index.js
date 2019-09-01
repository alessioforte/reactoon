import React from 'react';
import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';
import Icon from '../Icon';
import Button from '../Button'
import Dropbox from '../Dropbox'

const Dropdown = ({ placeholder, children }) => {
  const renderInput = () => (
    <Button>
      { placeholder ? placeholder :  <Icon name='caret' size='5px' />}
    </Button>
  )
  const renderOptions = () => (
    <List>
      {children &&
        children.map((item, i) => (
          <Option key={`select-${i}`}>{item}</Option>
        ))}
    </List>
  )
  return (
    <Dropbox
      renderInput={renderInput}
      renderOptions={renderOptions}
    />
  )
}

export default Dropdown

const List = styled.div`

`;
const Option = styled.div`
  margin: 0;
  min-height: 30px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.hover)]};
    cursor: pointer;
  }
`
