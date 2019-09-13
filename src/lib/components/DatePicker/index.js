import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';
import Theme, { getContrastYIQ } from '../../theme';
import Time from '../../utils/Time';
import Icon from '../Icon';
import Week from './Week';
import Context from './Context';
import Dropbox from '../Dropbox';

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.today = [
      moment().weekday(),
      moment().date(),
      moment().month(),
      moment().year()
    ];

    const date = Time.getCurrentMonthWeeks(this.today);

    this.weekdays = [];
    let weekday;
    /* eslint-disable-next-line */
    for (let i = 0; i < 7; i++) {
      weekday = moment().weekday(i);
      this.weekdays.push([
        weekday.format('ddd'),
        Number(
          moment()
            .weekday(i)
            .format('d')
        )
      ]);
    }

    this.state = {
      text: null,
      selected: null,
      placeholder: props.placeholder,
      date
    };
  }

  getMonth(pick) {
    const { date } = this.state;
    if (pick === 'last') this.setState({ date: Time.getLastMonthWeeks(date) });
    else this.setState({ date: Time.getNextMonthWeeks(date) });
  }

  open(callback) {
    const { selected } = this.state;
    let { date } = this.state;

    if (selected) date = Time.getCurrentMonthWeeks(selected);
    else date = Time.getCurrentMonthWeeks(this.today);
    this.setState({ date });
    callback()
  }

  select(day, callback) {
    let text = `${day[1]} ${moment.months(day[2])} ${day[3]}`;
    let date = new Date(`${day[2] + 1}/${day[1]}/${day[3]}`);
    this.setState({ text, selected: day });
    this.props.onChange(date);
    callback()
  }

  clear(e) {
    e.stopPropagation();
    this.setState({ text: null, selected: null });
    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  render() {
    const { isError, theme } = this.props;
    const { text, placeholder, date, selected } = this.state;

    const weeks = date.weeks || [];
    const month = moment()
      .month(date.month)
      .format('MMMM');

    const renderTarget = ({ show }) => (
      <Target
        onClick={() => this.open(show)}
        isError={isError}
        isText={text ? false : true}
      >
        {text ? text : placeholder}
        <div>
          {selected && (
            <IconDelete onClick={e => this.clear(e)}>
              <Icon
                name='delete'
                size='8px'
                color={theme.colors.background}
              />
            </IconDelete>
          )}
          <div>
            <Icon name='caret' size='5px' color={theme.colors.ground} />
          </div>
        </div>
      </Target>
    )

    const renderDropdown = ({ close }) => (
      <Month>
        <Header>
          <CaretBox right={false} onClick={() => this.getMonth('last')}>
            <Icon
              name='caret'
              size='5px'
              color={theme[getContrastYIQ(theme.colors.background)]}
            />
          </CaretBox>
          {month} {date.year}
          <CaretBox right={true} onClick={() => this.getMonth('next')}>
            <Icon
              name='caret'
              size='5px'
              color={theme[getContrastYIQ(theme.colors.background)]}
            />
          </CaretBox>
        </Header>
        <Context.Provider
          value={{ today: this.today, month: date.month, selected }}
        >
          <Weekdays>
            {this.weekdays.map(weekday => (
              <Weekday
                holiday={0 === weekday[1] || 6 === weekday[1]}
                key={weekday[0]}
              >
                {weekday[0]}
              </Weekday>
            ))}
          </Weekdays>
          <div>
            {weeks.map((week, i) => (
              <Week
                selectDay={day => this.select(day, close)}
                key={`${month}-${i}`}
                week={week}
              />
            ))}
          </div>
        </Context.Provider>
      </Month>
    )

    return (
      <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
    );
  }
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired
};

DatePicker.defaultProps = {
  placeholder: 'select date...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(DatePicker);

/* eslint-disable */
const Target = styled.div`
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
const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;
const IconDelete = styled(IconContainer)`
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
const CaretBox = styled(IconContainer)`
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
const Weekday = styled.div`
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
