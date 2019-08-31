/* eslint-disable */
import moment from 'moment';

export default class Time {
  static buildDays(month, firstweekday, year) {
    let days = [];
    let daysInMonth = this.getDaysInMonth(month, year);

    for (let i = 0; i < daysInMonth; i++) {
      if (firstweekday === 7) firstweekday = 0;
      let weekday = firstweekday;
      firstweekday++;
      let numberday = i + 1;
      days.push([weekday, numberday, month, year]);
    }

    return days;
  }

  static buildWeeks(month, firstweekday, year) {
    let weeks = [];
    let days = this.buildDays(month, firstweekday, year);
    let previousDays = [];
    let nextDays = [];

    if (firstweekday > 0) {
      let previousMonth = moment()
        .month(month)
        .subtract(1, 'month')
        .month();
      let previousYear = month === 0 ? year - 1 : year;
      let daysInPreviousMonth = this.getDaysInMonth(
        previousMonth,
        previousYear
      );
      let prevWeekDay = 0;
      let i = daysInPreviousMonth - firstweekday + 1;
      for (i; i <= daysInPreviousMonth; i++) {
        previousDays.push([prevWeekDay, i, previousMonth, previousYear]);
        prevWeekDay++;
      }
    }

    let nextMonth = moment()
      .month(month)
      .add(1, 'month')
      .month();
    let nextYear = month < 11 ? year : year + 1;
    let nextMonthFirstWeekday = days[days.length - 1][0] + 1;
    let nextNumberday = 1;
    for (let i = nextMonthFirstWeekday; i < 7; i++) {
      nextDays.push([
        nextMonthFirstWeekday++,
        nextNumberday++,
        nextMonth,
        nextYear
      ]);
    }

    let totalDays = [...previousDays, ...days, ...nextDays];
    let j = totalDays.length;
    let chunk = 7;
    let chunkArr = [];
    for (let i = 0; i < j; i += chunk) {
      chunkArr = totalDays.slice(i, i + chunk);
      weeks.push(chunkArr);
    }

    return weeks;
  }

  static getDaysInMonth(month, year) {
    return moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth();
  }

  static getCurrentMonthWeeks([weekday, numberday, month, year]) {
    let firstweekday = Time.getFistWeekdayOfMonth(weekday, numberday);
    let weeks = Time.buildWeeks(month, firstweekday, year);
    let days = Time.buildDays(month, firstweekday, year);

    return { year, month, weeks, days };
  }
  /**
   *
   * @param { year, month, days } date
   */
  static getNextMonthWeeks(date) {
    let year = date.month < 11 ? date.year : date.year + 1;
    let nextMonth = moment()
      .month(date.month)
      .add(1, 'month')
      .month();

    let firstweekday = date.days[date.days.length - 1][0] + 1;
    let weeks = this.buildWeeks(nextMonth, firstweekday, year);
    let days = this.buildDays(nextMonth, firstweekday, year);

    return { year, month: nextMonth, weeks, days };
  }

  /**
   *
   * @param { year, month, days } date
   */
  static getLastMonthWeeks(date) {
    let year = date.month === 0 ? date.year - 1 : date.year;
    let previousMonth = moment()
      .month(date.month)
      .subtract(1, 'month')
      .month();
    let daysInMonth = this.getDaysInMonth(previousMonth, year);

    let firstweekday = this.getFistWeekdayOfMonth(
      date.days[0][0] - 1,
      daysInMonth
    );
    let weeks = this.buildWeeks(previousMonth, firstweekday, year);
    let days = this.buildDays(previousMonth, firstweekday, year);

    return { year, month: previousMonth, weeks, days };
  }

  static getCurrentMonth([weekday, numberday, month, year]) {
    let firstweekday = Time.getFistWeekdayOfMonth(weekday, numberday);
    let days = Time.buildDays(month, firstweekday, year);

    return { year, month, days };
  }

  /**
   *
   * @param { year, month, days } date
   */
  static getNextMonth(date) {
    let year = date.month < 11 ? date.year : date.year + 1;
    let nextMonth = moment()
      .month(date.month)
      .add(1, 'month')
      .month();

    let firstweekday = date.days[date.days.length - 1][0] + 1;
    let days = this.buildDays(nextMonth, firstweekday, year);

    return { year, month: nextMonth, days };
  }

  /**
   *
   * @param { year, month, days } date
   */
  static getLastMonth(date) {
    let year = date.month === 0 ? date.year - 1 : date.year;
    let previousMonth = moment()
      .month(date.month)
      .subtract(1, 'month')
      .month();
    let daysInMonth = this.getDaysInMonth(previousMonth, year);

    let firstweekday = this.getFistWeekdayOfMonth(
      date.days[0][0] - 1,
      daysInMonth
    );
    let days = this.buildDays(previousMonth, firstweekday, year);

    return { year, month: previousMonth, days };
  }

  static getFistWeekdayOfMonth(weekday, numberday) {
    let firstweekday = weekday - (numberday % 7) + 1;
    if (firstweekday < 0) firstweekday = firstweekday + 7;
    return firstweekday;
  }
}
