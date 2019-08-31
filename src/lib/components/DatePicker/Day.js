import React from 'react';
import styled from 'styled-components';
import { getContrastYIQ } from '../../theme';
import Context from './Context';

export default ({ day, select }) => {
  const numberday = day[1];

  return (
    <Context.Consumer>
      {value => {
        let today = false;
        if (value.selected) {
          today =
            day[0] === value.selected[0] &&
            day[1] === value.selected[1] &&
            day[2] === value.selected[2] &&
            day[3] === value.selected[3];
        }
        const selected =
          day[0] === value.today[0] &&
          day[1] === value.today[1] &&
          day[2] === value.today[2] &&
          day[3] === value.today[3];

        return (
          <Day
            onClick={() => select(day)}
            selected={selected || today}
            today={today}
            month={day[2] === value.month}
          >
            <NumberDay>{numberday}</NumberDay>
          </Day>
        );
      }}
    </Context.Consumer>
  );
};

/* eslint-disable */
const Day = styled.div`
  border-radius: 2px;
  box-sizing: border-box;
  height: 30px;
  background: ${({ theme, selected, today, month }) =>
    selected
      ? today
        ? theme.colors.primary
        : theme.colors.secondary
      : month
      ? theme.colors.ground
      : theme.colors.flatground};
  color: ${({ theme, selected, today, month }) =>
    selected
      ? today
        ? theme.colors[getContrastYIQ(theme.colors.primary)]
        : theme.colors[getContrastYIQ(theme.colors.secondary)]
      : month
      ? theme.colors[getContrastYIQ(theme.colors.ground)]
      : theme.colors[getContrastYIQ(theme.colors.flatground)]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.hover};
    cursor: pointer;
  }
`;
const NumberDay = styled.div`
  font-size: 12px;
`;
/* eslint-enable */
