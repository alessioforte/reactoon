import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { getContrastYIQ } from '../../utils';
import Context from './Context';

export default ({ day, select }) => {
  const numberday = day[1];
  const value = useContext(Context) as {
    minDate: [][];
    maxDate: [][];
    value: string;
    month: number;
    selected: number[];
    today: number[];
  };
  const { minDate, maxDate } = value;

  const bound =
    (minDate &&
      day[0] === minDate[0] &&
      day[1] === minDate[1] &&
      day[2] === minDate[2] &&
      day[3] === minDate[3]) ||
    (maxDate &&
      day[0] === maxDate[0] &&
      day[1] === maxDate[1] &&
      day[2] === maxDate[2] &&
      day[3] === maxDate[3]);

  const handleOnClick = () => {
    if (
      minDate &&
      ((day[3] <= minDate[3] && day[2] < minDate[2]) ||
        (day[2] === minDate[2] && day[1] < minDate[1]))
    ) {
      return;
    }
    if (
      maxDate &&
      ((day[3] >= maxDate[3] && day[2] > maxDate[2]) ||
        (day[2] === maxDate[2] && day[1] > maxDate[1]))
    ) {
      return;
    }
    select(day);
  };

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

  const kind = selected
    ? 'selected'
    : today
    ? 'today'
    : bound
    ? 'boud'
    : 'default';

  return (
    <Day onClick={handleOnClick} month={day[2] === value.month} kind={kind}>
      <NumberDay>{numberday}</NumberDay>
    </Day>
  );
};

const COLORS = {
  today: css`
    background: ${props => props.theme.colors.primary};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  `,
  bound: css`
    background: ${props => props.theme.colors.upperground};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.upperground)]};
  `,
  selected: css`
    background: ${props => props.theme.colors.secondary};
    color: ${props =>
      props.theme.colors[getContrastYIQ(props.theme.colors.secondary)]};
  `,
  default: css<{ month: number }>`
    background: ${props =>
      props.month ? props.theme.colors.ground : props.theme.colors.flatground};
    color: ${props =>
      props.month
        ? props.theme.colors[getContrastYIQ(props.theme.colors.ground)]
        : props.theme.colors[getContrastYIQ(props.theme.colors.flatground)]};
  `
};

/* eslint-disable */
const Day = styled.div<{ kind: string; month: boolean }>`
  border-radius: 2px;
  box-sizing: border-box;
  height: 30px;
  ${props => COLORS[props.kind]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  &:hover {
    border: 2px solid ${({ theme }) => theme.colors.hover};
    cursor: pointer;
  }
`;
const NumberDay = styled.div`
  font-size: 12px;
`;
/* eslint-enable */
