
export {}
// import React, { FC, ReactNode, useState, useEffect, useRef } from 'react';
// import styled, { withTheme, ThemeProvider } from 'styled-components';
// import { useResize } from '../../hooks';

// type Props = {
//   children?: ReactNode,
//   enableTransition?: boolean,
//   duration?: number,
//   height?: number,
//   theme: any
// }

// const Slideshow: FC<Props> = ({ children, enableTransition, height, duration, theme }) => {
//   const container = useRef();
//   const size = useResize();
//   const [selected, setSelected] = useState(0);

//   useEffect(() => {
//     if (enableTransition) {
//       const interval = setInterval(() => {
//         const i = (selected + 1) % React.Children.count(children);
//         setSelected(i);
//       }, duration)
//       return () => clearInterval(interval)
//     }
//   }, [selected, enableTransition, duration, children]);


//   const shiftSlide = (i: number) => {
//     setSelected(i);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box>
//         <Dots>
//           {
//             React.Children.map(children, (child, i: number) => (
//               <Dot
//                 key={i}
//                 onClick={() => shiftSlide(i)}
//                 active={i === selected}
//               />
//             ))
//           }
//         </Dots>
//         <Slides ref={container} height={height || 300}>
//           {children &&
//             React.Children.map(children, (child, i) => (
//               <Slide key={i} left={size.width * i - size.width * selected}>
//                 {child}
//               </Slide>
//             ))}
//         </Slides>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default withTheme(Slideshow)

// const Box = styled.div`
//   position: relative;
// `;
// const Slides = styled.div<{height: number, ref: any}>`
//   position: relative;
//   display: flex;
//   overflow: hidden;
//   height: ${props => props.height}px;
//   background: pink;
// `;
// const Slide = styled.div<{left: number}>`
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   flex-shrink: 0;
//   left: ${props => props.left}px;
//   transition: all 0.7s cubic-bezier(0.86, 0, 0.07, 1);
// `;
// const Dots = styled.div`
//   position: absolute;
//   bottom: 20px;
//   left: 20px;
//   z-index: 8;
//   display: flex;
// `;
// const Dot = styled.div<{active: boolean}>`
//   width: 10px;
//   height: 10px;
//   border-radius: 50%;
//   background: ${props => (props.active ? props.theme.colors.primary : 'rgba(0,0,0,0.3)')};
//   margin: 5px;
//   cursor: pointer;
// `;
