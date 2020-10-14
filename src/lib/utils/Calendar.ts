export const days = {
  0: 'Sun', // Sunday
  1: 'Mon', // Monday
  2: 'Tue', // Tuesday
  3: 'Wed', // Wednesday
  4: 'Thu', // Thursday
  5: 'Fri', // Friday
  6: 'Sat' // Saturday
};

export const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

class Calendar {
  static buildDays(month: number, firstweekday: number, year: number) {
    let days: number[][] = [];
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
    let weeks: number[][][] = [];
    let days = this.buildDays(month, firstweekday, year);
    let previousDays: number[][] = [];
    let nextDays: number[][] = [];

    if (firstweekday > 0) {
      const previousMonth = this.getPreviousMonth(month, year);
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

    const nextMonth = this.getNextMonth(month, year);
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
    let chunkArr: number[][] = [];
    for (let i = 0; i < j; i += chunk) {
      chunkArr = totalDays.slice(i, i + chunk);
      weeks.push(chunkArr);
    }

    return weeks;
  }

  static getDayArray(date?: Date | null) {
    const d = date || new Date();
    const weekday = d.getDay();
    const numberday = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();
    return [weekday, numberday, month, year];
  }

  static getDaysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  static getNextMonth(month: number, year: number) {
    const date = new Date(year, month);
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    return date.getMonth();
  }

  static getPreviousMonth(month: number, year: number) {
    const date = new Date(year, month);
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    return date.getMonth();
  }

  static buildLastMonth(month: number, year: number) {
    const previousMonth = this.getPreviousMonth(month, year);
    const newYear = month === 0 ? year - 1 : year;
    const firstweekday = this.getInitialWeekdayOfMonth(previousMonth, newYear);
    const weeks = this.buildWeeks(previousMonth, firstweekday, newYear);
    const days = this.buildDays(previousMonth, firstweekday, newYear);
    return { year: newYear, month: previousMonth, weeks, days };
  }

  static buildNextMonth(month: number, year: number) {
    console.log('build next month')
    const nextMonth = this.getNextMonth(month, year);
    const newYear = month < 11 ? year : year + 1;
    const firstweekday = this.getInitialWeekdayOfMonth(nextMonth, newYear);
    const weeks = this.buildWeeks(nextMonth, firstweekday, newYear);
    const days = this.buildDays(nextMonth, firstweekday, newYear);
    return { year: newYear, month: nextMonth, weeks, days };
  }

  static buildCurrentMonth() {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstweekday = this.getInitialWeekdayOfMonth(month, year);
    const days = this.buildDays(month, firstweekday, year);
    const weeks = this.buildWeeks(month, firstweekday, year);
    return { year, month, days, weeks };
  }

  static buildMonth(month: number, year: number) {
    const firstweekday = this.getInitialWeekdayOfMonth(month, year);
    const days = this.buildDays(month, firstweekday, year);
    const weeks = this.buildWeeks(month, firstweekday, year);
    return { year, month, weeks, days };
  }

  static getInitialWeekdayOfMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const day = date.getDay();
    let firstweekday = day - (1 % 7) + 1;
    if (firstweekday < 0) firstweekday = firstweekday + 7;
    return firstweekday;
  }
}

export default Calendar;



// import moment from 'moment';

// export default class Time {
//   static buildDays(month: number, firstweekday: number, year: number) {
//     let days: number[][] = [];
//     let daysInMonth = this.getDaysInMonth(month, year);

//     for (let i = 0; i < daysInMonth; i++) {
//       if (firstweekday === 7) firstweekday = 0;
//       let weekday = firstweekday;
//       firstweekday++;
//       let numberday = i + 1;
//       days.push([weekday, numberday, month, year]);
//     }

//     return days;
//   }

//   static buildWeeks(month, firstweekday, year) {
//     let weeks: number[][][] = [];
//     let days = this.buildDays(month, firstweekday, year);
//     let previousDays: number[][] = [];
//     let nextDays: number[][] = [];

//     if (firstweekday > 0) {
//       let previousMonth = moment()
//         .month(month)
//         .subtract(1, 'month')
//         .month();
//       let previousYear = month === 0 ? year - 1 : year;
//       let daysInPreviousMonth = this.getDaysInMonth(
//         previousMonth,
//         previousYear
//       );
//       let prevWeekDay = 0;
//       let i = daysInPreviousMonth - firstweekday + 1;
//       for (i; i <= daysInPreviousMonth; i++) {
//         previousDays.push([prevWeekDay, i, previousMonth, previousYear]);
//         prevWeekDay++;
//       }
//     }

//     let nextMonth = moment()
//       .month(month)
//       .add(1, 'month')
//       .month();
//     let nextYear = month < 11 ? year : year + 1;
//     let nextMonthFirstWeekday = days[days.length - 1][0] + 1;
//     let nextNumberday = 1;
//     for (let i = nextMonthFirstWeekday; i < 7; i++) {
//       nextDays.push([
//         nextMonthFirstWeekday++,
//         nextNumberday++,
//         nextMonth,
//         nextYear
//       ]);
//     }

//     let totalDays = [...previousDays, ...days, ...nextDays];
//     let j = totalDays.length;
//     let chunk = 7;
//     let chunkArr: number[][] = [];
//     for (let i = 0; i < j; i += chunk) {
//       chunkArr = totalDays.slice(i, i + chunk);
//       weeks.push(chunkArr);
//     }

//     return weeks;
//   }

//   static getDaysInMonth(month, year) {
//     return moment(`${year}-${month + 1}`, 'YYYY-MM').daysInMonth();
//   }

//   static getCurrentMonthWeeks([weekday, numberday, month, year]: number[]) {
//     let firstweekday = Time.getFistWeekdayOfMonth(weekday, numberday);
//     let weeks = Time.buildWeeks(month, firstweekday, year);
//     let days = Time.buildDays(month, firstweekday, year);
//     return { year, month, weeks, days };
//   }
//   /**
//    *
//    * @param { year, month, days } date
//    */
//   static getNextMonthWeeks(date) {
//     let year = date.month < 11 ? date.year : date.year + 1;
//     let nextMonth = moment()
//       .month(date.month)
//       .add(1, 'month')
//       .month();

//     let firstweekday = date.days[date.days.length - 1][0] + 1;
//     let weeks = this.buildWeeks(nextMonth, firstweekday, year);
//     let days = this.buildDays(nextMonth, firstweekday, year);

//     return { year, month: nextMonth, weeks, days };
//   }

//   /**
//    *
//    * @param { year, month, days } date
//    */
//   static getLastMonthWeeks(date) {
//     let year = date.month === 0 ? date.year - 1 : date.year;
//     let previousMonth = moment()
//       .month(date.month)
//       .subtract(1, 'month')
//       .month();
//     let daysInMonth = this.getDaysInMonth(previousMonth, year);

//     let firstweekday = this.getFistWeekdayOfMonth(
//       date.days[0][0] - 1,
//       daysInMonth
//     );
//     let weeks = this.buildWeeks(previousMonth, firstweekday, year);
//     let days = this.buildDays(previousMonth, firstweekday, year);

//     return { year, month: previousMonth, weeks, days };
//   }

//   static getCurrentMonth([weekday, numberday, month, year]) {
//     let firstweekday = Time.getFistWeekdayOfMonth(weekday, numberday);
//     let days = Time.buildDays(month, firstweekday, year);

//     return { year, month, days };
//   }

//   // static buildMonth(month: number, year: number) {
//   //   const date = new Date(year, month)
//   //   const daysInMonth = this.getDaysInMonth(month, year);
//   //   const day = date.getDay()
//   //   const firstweekday = Time.getFistWeekdayOfMonth(day, daysInMonth) + 1
//   //   const days = this.buildDays(month, firstweekday, year);
//   //   const weeks = this.buildWeeks(month, firstweekday, year)
//   //   console.log({month, year, date, day, firstweekday, days })
//   //   return { year, month, days, weeks }
//   // }

//   /**
//    *
//    * @param { year, month, days } date
//    */
//   static getNextMonth(date) {
//     let year = date.month < 11 ? date.year : date.year + 1;
//     let nextMonth = moment()
//       .month(date.month)
//       .add(1, 'month')
//       .month();

//     let firstweekday = date.days[date.days.length - 1][0] + 1;
//     let days = this.buildDays(nextMonth, firstweekday, year);

//     return { year, month: nextMonth, days };
//   }

//   /**
//    *
//    * @param { year, month, days } date
//    */
//   static getLastMonth(date) {
//     let year = date.month === 0 ? date.year - 1 : date.year;
//     let previousMonth = moment()
//       .month(date.month)
//       .subtract(1, 'month')
//       .month();
//     let daysInMonth = this.getDaysInMonth(previousMonth, year);

//     let firstweekday = this.getFistWeekdayOfMonth(
//       date.days[0][0] - 1,
//       daysInMonth
//     );
//     let days = this.buildDays(previousMonth, firstweekday, year);

//     return { year, month: previousMonth, days };
//   }

//   static getFistWeekdayOfMonth(weekday, numberday) {
//     let firstweekday = weekday - (numberday % 7) + 1;
//     if (firstweekday < 0) firstweekday = firstweekday + 7;
//     return firstweekday;
//   }
// }
