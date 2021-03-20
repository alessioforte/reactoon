import React, { useState, FC } from 'react';
import styled, { withTheme } from 'styled-components';
import { styles, getContrastYIQ } from '../../theme';
import Calendar, { months, days } from '../../utils/Calendar';
import Icon from '../Icon';
import Week from './Week';
import Context from './Context';
import Dropbox from '../Dropbox';

type Props = {
  label?: string;
  placeholder?: string;
  onChange?: () => void;
  name?: string;
  isError?: boolean;
  theme?: any;
  min?: Date;
  max?: Date;
};

const DatePicker: FC<Props> = ({
  label,
  placeholder = 'select date...',
  onChange = date => console.log(date),
  name = '',
  isError = false,
  theme = styles,
  min,
  max
}) => {
  // dateFormat
  // renderInput
  // value
  // defaultValue
  const [date, setDate] = useState(Calendar.buildCurrentMonth());
  const [selected, setSelected] = useState<number[] | null>(null);
  const [text, setText] = useState<string | null>(null);

  const today = Calendar.getDayArray();
  const minDate: number[] | null = min ? Calendar.getDayArray(min) : null;
  const maxDate: number[] | null = max ? Calendar.getDayArray(max) : null;
  const weekdays: any[] = Object.keys(days).map(key => [days[key], Number(key)]);
  const getLastMonth = e => {
    e.stopPropagation();
    const { month, year } = date;
    if (minDate && minDate[2] === month && minDate[3] === year) return;
    const newDate = Calendar.buildLastMonth(month, year);
    setDate(newDate);
  };

  const getNextMonth = e => {
    e.stopPropagation();
    const { month, year } = date;
    if (maxDate && maxDate[2] === month && maxDate[3] === year) return;
    const newDate = Calendar.buildNextMonth(month, year);
    setDate(newDate);
  };

  const setLastYear = e => {
    e.stopPropagation();
    const newDate = Calendar.buildMonth(date.month, date.year - 1);
    setDate(newDate);
  }

  const setNextYear = e => {
    e.stopPropagation();
    const newDate = Calendar.buildMonth(date.month, date.year + 1);
    setDate(newDate);
  }

  const open = callback => {
    let newDate;
    if (selected) {
      const month = selected[2]
      const year = selected[3]
      newDate = Calendar.buildMonth(month, year);
    }
    else newDate = Calendar.buildCurrentMonth();
    setDate(newDate);
    if (callback) callback();
  };

  const select = (day, callback) => {
    const t = `${day[1]} ${months[day[2]]} ${day[3]}`;
    const d = new Date(`${day[2] + 1}/${day[1]}/${day[3]}`);
    setText(t);
    setSelected(day);
    onChange(d);
    if (callback) callback();
  };

  const clear = e => {
    e.stopPropagation();
    setText(null);
    setSelected(null);
    onChange(null);
  };

  const renderTarget = ({ show }) => (
    <Target
      onClick={() => open(show)}
      isError={isError}
      isText={!!text}
      name={name}
    >
      {text || placeholder}
      <div>
        {selected && (
          <IconDelete onClick={clear}>
            <Icon name='delete' size='8px' color={theme.colors.background} />
          </IconDelete>
        )}
        <div>
          <Icon name='caret' size='5px' color={theme.colors.ground} />
        </div>
      </div>
    </Target>
  );

  const renderDropdown = ({ close }) => {
    const weeks = date.weeks || [];
    const month = months[date.month];

    return (
      <Month>
        <Header>
          <Arrows>
            <CaretBox onClick={setLastYear}>
              <Icon
                name='caret-double-left'
                size='10px'
                color={theme.colors.upperground}
              />
            </CaretBox>
            <CaretBox onClick={getLastMonth}>
              <Icon
                name='caret-left'
                size='10px'
                color={theme.colors.upperground}
              />
            </CaretBox>
          </Arrows>
          {month} {date.year}
          <Arrows>
            <CaretBox onClick={getNextMonth}>
              <Icon
                name='caret-right'
                size='10px'
                color={theme.colors.upperground}
              />
            </CaretBox>
            <CaretBox onClick={setNextYear}>
              <Icon
                name='caret-double-right'
                size='10px'
                color={theme.colors.upperground}
              />
            </CaretBox>
          </Arrows>
        </Header>
        <Context.Provider
          value={{ today, month: date.month, selected, minDate, maxDate }}
        >
          <Weekdays>
            {weekdays.map(w => (
              <Weekday holiday={0 === w[1] || 6 === w[1]} key={w[0]}>
                {w[0]}
              </Weekday>
            ))}
          </Weekdays>
          <div>
            {weeks.map((week, i) => (
              <Week
                key={`${month}-${i.toString()}`}
                selectDay={day => select(day, close)}
                week={week}
              />
            ))}
          </div>
        </Context.Provider>
      </Month>
    );
  };

  return (
    <>
      {label && <span>{label}</span>}
      <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
    </>
  );
};

export default withTheme(DatePicker);

/* eslint-disable */
const Target = styled.div<{ isError: boolean; isText: boolean; name: string }>`
  border-radius: ${props => props.theme.border.radius + 'px'};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 230px;
  min-height: 30px;
  font-size: 12px;
  background: ${props => props.theme.colors.background};
  color: ${props =>
    props.isText
      ? props.theme.colors.ground
      : props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
  border: 1px solid
    ${props =>
      props.isError ? props.theme.colors.error : props.theme.colors.background};
  padding: 0 10px;
  &:hover {
    border-color: ${props => props.theme.colors.ground};
  }
  & > div {
    min-width: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;
const Month = styled.div`
  box-sizing: border-box;
  width: 222px;
  margin: auto;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
`;
const Header = styled.div`
  height: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  color: ${props => props.theme.colors.ground};
`;
const IconDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  background: ${props => props.theme.colors.flatground};
  border-radius: 50%;
  margin: 0 10px;
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.ground};
  }
`;
const CaretBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;
const Arrows = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30px;
`;
const Weekdays = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 2px;
`;
const Weekday = styled.div<{ holiday: boolean }>`
  box-sizing: border-box;
  height: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${props =>
    props.holiday
      ? props.theme.colors.holiday
      : props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
`;
