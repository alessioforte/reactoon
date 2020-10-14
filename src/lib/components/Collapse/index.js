import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '../Icon';

const Collapse = ({ isOpen, children, title }) => {
  const [state, setState] = useState(isOpen);

  const togglePanel = () => {
    setState(!state);
  };

  return (
    <Collapsed isOpen={state}>
      <div
        onClick={togglePanel}
        className='collapse'
        role='button'
        aria-hidden='true'
      >
        {title}
        <div className='icon'>
          <Icon
            name={isOpen ? 'angle-top' : 'angle-down'}
          />
        </div>
      </div>
      {isOpen && <div className='box'>{children}</div>}
    </Collapsed>
  );
};

Collapse.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  open: PropTypes.bool
};

Collapse.defaultProps = {
  title: 'default'
};

export default Collapse;

const Collapsed = styled.div`
  user-select: none;
  max-width: 100%;
  .collapse {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid black;
    border-radius: ${props => (props.isOpen ? '3px 3px 0 0' : '3px')};
    padding-left: 10px;
    background-color: white;
    color: black;
    cursor: pointer;
    .icon {
      border-left: 1px solid gray;
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .box {
    border: 1px solid gray;
    border-top: none;
    border-radius: 0 0 5px 5px;
    padding: 10px;
    display: inline-flex;
    flex-flow: row wrap;
    width: 100%;
    justify-content: space-between;
    background-color: white;
  }
`;
