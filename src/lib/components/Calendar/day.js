import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import theme from '../../theme';

export default ({ day }) => {
  const [weekday, numberday] = day;
  const weekdayformat = moment().day(weekday);
  const daycolor = weekday === 0 || weekday === 6 ? theme.holiday : '#999';
  const numbercolor = weekday === 0 || weekday === 6 ? theme.holiday : '#fff';
  return (
    <Day onClick={() => console.log(day)}>
      <WeekDay color={daycolor}>{weekdayformat.format('ddd')}</WeekDay>
      <NumberDay color={numbercolor}>{numberday}</NumberDay>
    </Day>
  );
};

const Day = styled.div`
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 1px;
  font-size: 8px;
  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`;
const WeekDay = styled.div`
  height: 10px;
  font-weight: bold;
  color: ${props => props.color};
`;
const NumberDay = styled.div`
  font-size: 12px;
  color: ${props => props.color};
`;
