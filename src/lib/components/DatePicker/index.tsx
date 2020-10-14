import React, { useState, FC } from 'react';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';
import { styles, getContrastYIQ } from '../../theme';
import Time from '../../utils/Time';
import Icon from '../Icon';
import Week from './Week';
import Context from './Context';
import Dropbox from '../Dropbox';

type Props = {
  label?: string;
  placeholder?: string;
  onChange?: () => {},
  name?: string,
  isError?: boolean,
  theme?: any,
  min?: Date,
  max?: Date
}

const DatePicker: FC<Props> = ({
  label,
  placeholder = 'select date...',
  onChange = date => console.log(date),
  name = '',
  isError = false,
  theme = styles,
  min,
  max,
}) => {
  // dateFormat
  // renderInput
  // value
  // defaultValue

  const today = [
    moment().weekday(),
    moment().date(),
    moment().month(),
    moment().year()
  ];

  let minDate: number[] | null = null;
  let maxDate: number[] | null = null;

  if (min) {
    minDate = [
      moment(min).weekday(),
      moment(min).date(),
      moment(min).month(),
      moment(min).year()
    ];
  }
  if (max) {
    maxDate = [
      moment(max).weekday(),
      moment(max).date(),
      moment(max).month(),
      moment(max).year()
    ];
  }

  const [date, setDate] = useState(Time.getCurrentMonthWeeks(today));
  const [selected, setSelected] = useState<number[] | null>(null);
  const [text, setText] = useState<string | null>(null);
  const weekdays: any[] = [];
  let weekday: any;
  /* eslint-disable-next-line */
  for (let i = 0; i < 7; i++) {
    weekday = moment().weekday(i);
    weekdays.push([
      weekday.format('ddd'),
      Number(
        moment()
          .weekday(i)
          .format('d')
      )
    ]);
  }

  const getLastMonth = e => {
    e.stopPropagation();
    const { month, year } = date;
    if (minDate && minDate[2] === month && minDate[3] === year) return;
    const newDate = Time.getLastMonthWeeks(date);
    setDate(newDate);
  };

  const getNextMonth = e => {
    e.stopPropagation();
    const { month, year } = date;
    if (maxDate && maxDate[2] === month && maxDate[3] === year) return;
    const newDate = Time.getNextMonthWeeks(date);
    setDate(newDate);
  };

  const open = callback => {
    let newDate;
    if (selected) newDate = Time.getCurrentMonthWeeks(selected);
    else newDate = Time.getCurrentMonthWeeks(today);
    setDate(newDate);
    if (callback) callback();
  };

  const select = (day, callback) => {
    const t = `${day[1]} ${moment.months(day[2])} ${day[3]}`;
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
    const month = moment()
      .month(date.month)
      .format('MMMM');
    return (
      <Month>
        <Header>
          <CaretBox right={false} onClick={getLastMonth}>
            <Icon name='caret' size='5px' color={theme.colors.background} />
          </CaretBox>
          {month} {date.year}
          <CaretBox right onClick={getNextMonth}>
            <Icon name='caret' size='5px' color={theme.colors.background} />
          </CaretBox>
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
const Target = styled.div<{ isError: boolean, isText: boolean, name: string }>`
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
const CaretBox = styled.div<{ right: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: ${props => (props.right ? 'rotate(-90deg)' : 'rotate(90deg)')};
  background: ${props => props.theme.colors.flatground};
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.colors.ground};
  }
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
