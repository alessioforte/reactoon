import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import Dropbox from '../Dropbox';
import Icon from '../Icon';

const Multiselect = ({ placeholder, options, isError, onChange, theme }) => {
  const [state, setState] = useState({
    label: placeholder || 'select...',
    values: [],
    selected: [],
    options
  });

  const select = item => {
    let selected = state.selected;
    let values = state.values;
    selected.push(item);
    values.push(item.value);

    setState({ selected, values });
    onChange(values);
  };

  const unselect = (e, item) => {
    // e.stopPropagation();
    // // let sIndex = this.state.selected.indexOf(item)
    // // selected.splice(sIndex, 1)
    // let values = state.values
    // let vIndex = values.indexOf(item.value);
    // values.splice(vIndex, 1);
    // let newOptions = options.filter(item => !state.selected.includes(item));
    // this.setState({
    //   selected,
    //   options: newOptions,
    //   values
    // });
    // this.props.onChange(values);
  };

  const renderSelected = () => {
    return state.selected.map((item, i) => (
      <div key={`${item}-${i}`}>
        {item.label}
        <div onClick={e => unselect(e, item)}>
          <Icon
            name='delete'
            size='8px'
            color={theme.colors[getContrastYIQ(theme.colors.primary)]}
            margin='0 0 0 8px'
          />
        </div>
      </div>
    ));
  };

  const renderTarget = ({ show }) => (
    <Target onClick={show} isError={isError} tabIndex='0'>
      {state.selected.length > 0 ? (
        <Selected>{renderSelected()}</Selected>
      ) : (
        <Placeholder>{state.label}</Placeholder>
      )}
    </Target>
  );

  const renderDropdown = ({ close }) => (
    <List>
      {options &&
        options.map((item, i) => (
          <li
            key={`${item.value}-${i}`}
            onClick={e => {
              select(item);
            }}
          >
            {item.label}
          </li>
        ))}
    </List>
  );
  return (
    <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
  );
};

Multiselect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

Multiselect.defaultProps = {
  placeholder: 'select...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(Multiselect);

const Target = styled.div`
  border-radius: ${props => props.theme.border.radius + 'px'};
  border: 1px solid
    ${props =>
      props.isError ? props.theme.colors.error : props.theme.colors.background};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 200px;
  min-height: 30px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props =>
    props.value
      ? props.theme.colors[getContrastYIQ(props.theme.colors.background)]
      : props.theme.colors.idle};
  padding: 0 10px;
  &:hover {
    border-color: ${props => props.theme.colors.ground};
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: ${props => (props.reverse ? 'column' : 'column-reverse')};
  order: ${props => (props.reverse ? '0' : '-1')};
  overflow: scroll;
  max-height: 338px;
  li {
    display: flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    list-style-type: none;
    margin: 0;
  }
  li:hover {
    background: ${props => props.theme.colors.primary};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
    cursor: pointer;
  }
`;
const Selected = styled.div`
  color: ${props =>
    props.isText
      ? props.theme.colors.idle
      : props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  & > div {
    display: inline-block;
    background: ${props => props.theme.colors.primary};
    padding: 3px 6px;
    margin: 1px;
    border-radius: 3px;
    div {
      display: inline-block;
      margin-left: 10px;
    }
  }
  svg:hover {
    cursor: pointer;
  }
`;
const Placeholder = styled.div`
  color: ${props => props.theme.colors.idle};
`;
