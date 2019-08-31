import React from 'react';
import styled from 'styled-components';
import Day from './Day';

export default ({ week, selectDay }) => {
  return (
    <Week>
      {week.map(day => (
        <Day
          select={selectDay}
          key={`${day[1]}-${day[2]}-${day[3]}`}
          day={day}
        />
      ))}
    </Week>
  );
};

const Week = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
  margin: 2px 0;
`;
