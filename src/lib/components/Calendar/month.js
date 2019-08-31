import React from 'react';
import styled from 'styled-components';
import Day from './day';

/* eslint-disable */
export default ({ days }) => {
  return (
    <Month>
      <Days>
        {days.map((day, i) => (
          <Day key={i} day={day} />
        ))}
      </Days>
    </Month>
  );
};

const Month = styled.div``;
const Days = styled.div`
  display: flex;
  background: #999;
`;
