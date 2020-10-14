// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import moment from 'moment';
// import Time from '../../utils/Time';
// import Month from './month';

// /* eslint-disable */
// class Calendar extends Component {
//   constructor(props) {
//     super(props);

//     // const today = {
//     //     weekday: moment().weekday(),
//     //     numberday: moment().date(),
//     //     month: moment().month(),
//     //     year: moment().year()
//     // }
//     this.today = [
//       moment().weekday(),
//       moment().date(),
//       moment().month(),
//       moment().year()
//     ];

//     const today = [
//       moment().weekday(),
//       moment().date(),
//       moment().month(),
//       moment().year()
//     ];

//     const current = Time.getCurrentMonth(today);
//     const previous = Time.getLastMonth(current);
//     const next = Time.getNextMonth(current);

//     this.dayWidth = 32;
//     this.width = props.daysShown * this.dayWidth || 30 * this.dayWidth;
//     this.start = (previous.days.length + today.numberday - 1) * this.dayWidth;
//     this.today = today;
//     this.months = [previous, current, next];
//     this.calendar = React.createRef();
//     this.handleOnScroll = this.handleOnScroll.bind(this);

//     this.state = {
//       months: this.months
//     };
//   }

//   componentDidMount() {
//     let endScroll = this.calendar.current.scrollWidth - this.width;
//     this.calendar.current.scrollLeft = this.start;
//     this.setState({ endScroll });
//   }

//   handleOnScroll(e) {
//     let elm = e.nativeEvent.target;
//     let scrollLeft = elm.scrollLeft;
//     let { endScroll, months } = this.state;

//     if (scrollLeft < 1) {
//       let previousMonth = Time.getLastMonth(months[0]);
//       let daysCount = 0;

//       months.splice(0, 0, previousMonth);
//       months.splice(3, 1);

//       months.forEach(month => {
//         daysCount += month.days.length;
//       });
//       this.calendar.current.scrollLeft =
//         previousMonth.days.length * this.dayWidth;

//       this.setState({
//         months,
//         endScroll: daysCount * this.dayWidth - this.width
//       });
//     }

//     if (scrollLeft > endScroll - 1) {
//       let nextMonth = Time.getNextMonth(months[2]);
//       let daysCount = 0;

//       months.splice(3, 0, nextMonth);
//       months.splice(0, 1);

//       months.forEach(month => {
//         daysCount += month.days.length;
//       });

//       this.calendar.current.scrollLeft =
//         (daysCount - nextMonth.days.length) * this.dayWidth - this.width;

//       this.setState({
//         months,
//         endScroll: daysCount * this.dayWidth - this.width
//       });
//     }
//   }

//   render() {
//     const { months } = this.state;

//     return (
//       <Box width={this.width}>
//         <ScrollBox
//           ref={this.calendar}
//           onScroll={this.handleOnScroll}
//           width={this.width}
//         >
//           {months.map((date, i) => (
//             <MonthBox key={`${date.year}-${date.month}`}>
//               <Header>
//                 <Year>{date.year} </Year>
//                 <span>
//                   {moment()
//                     .month(date.month)
//                     .format('MMMM')}
//                 </span>
//               </Header>
//               <Month days={date.days} />
//             </MonthBox>
//           ))}
//         </ScrollBox>
//       </Box>
//     );
//   }
// }

// Calendar.propTypes = {
//   daysShown: PropTypes.number
// };

// Calendar.defaultProps = {
//   daysShown: 7
// };

// export default Calendar;

// const Box = styled.div`
//   width: ${props => props.width + 'px'};
//   position: relative;
// `;
// const ScrollBox = styled.div`
//   box-sizing: border-box;
//   display: flex;
//   width: ${props => props.width + 'px'};
//   overflow: scroll;
//   ::-webkit-scrollbar {
//     width: 0;
//     height: 0;
//   }
// `;
// const MonthBox = styled.div``;
// const Header = styled.div`
//   font-size: 12px;
//   height: 14px;
//   display: inline-block;
//   position: sticky;
//   left: 0;
//   background: #1a1a1a;
//   padding: 0 3px;
// `;
// const Year = styled.span`
//   color: #999;
// `;
