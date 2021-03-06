export {}
// import React, { useState, FC } from 'react';
// import { withTheme } from 'styled-components';
// import Dropbox from '../../lib/components/Dropbox';
// import { styles } from '../../../lib/theme';
// import { Options, Option, Control } from './styled';
// import Icon from '../Icon';
// import Tag from '../Tag';
// import { Target } from '../Styled';

// interface Props {
//   placeholder?: string;
//   options?: any;
//   onChange?: (values: any) => void;
//   isError?: boolean;
//   theme?: any;
// }

// interface State {
//   selected: any[];
//   values: any[];
// }

// const FilterSelect: FC<Props> = ({
//   placeholder = 'select...',
//   options = [],
//   onChange = value => console.log(value),
//   isError = false,
//   theme = styles
// }) => {
//   const [state, setState] = useState<State>({ selected: [], values: [] });
//   const label = placeholder || 'select...';

//   const select = (e, item) => {
//     const selected = state.selected;
//     const values = state.values;
//     selected.push(item);
//     values.push(item.value);

//     setState({ selected, values });
//     onChange(values);
//   };

//   const selectAll = () => {
//     const all = [...options];
//     const values = all.map(item => item.value);

//     setState({ selected: all, values });
//     onChange(values);
//   };

//   const unselectAll = () => {
//     setState({ selected: [], values: [] });
//     onChange([]);
//   };

//   const unselect = (e, item) => {
//     e.stopPropagation();
//     const sIndex = state.selected.indexOf(item);
//     const selected = state.selected;
//     selected.splice(sIndex, 1);

//     const vIndex = state.values.indexOf(item.value);
//     const values = state.values;
//     values.splice(vIndex, 1);

//     setState({ selected, values });
//     onChange(values);
//   };

//   const renderTarget = ({ show }) => (
//     <Target onClick={show} isError={isError} tabIndex={0}>
//       {label}
//       <div className='icon'>
//         <Icon name='caret' size='5px' color={theme.colors.ground} />
//       </div>
//     </Target>
//   );

//   const renderSelected = () =>
//     state.selected.map((item, i) => (
//       <Tag
//         key={`${item.value}`}
//         label={item.label}
//         icon='delete'
//         onClick={e => unselect(e, item)}
//       />
//     ));

//   const renderDropdown = () => (
//     <>
//       <Control>
//         <div>{renderSelected()}</div>
//         {state.selected.length === 0 ? (
//           <div className='button' onClick={selectAll}>
//             All
//           </div>
//         ) : (
//           <div className='button' onClick={unselectAll}>
//             Reset
//           </div>
//         )}
//       </Control>
//       <Options>
//         {options &&
//           options.map((item, i) => {
//             const isSelected = state.selected.includes(item);
//             return (
//               <Option
//                 key={`${item.value}`}
//                 isSelected={isSelected}
//                 onClick={
//                   isSelected ? e => unselect(e, item) : e => select(e, item)
//                 }
//               >
//                 {item.label}
//               </Option>
//             );
//           })}
//       </Options>
//     </>
//   );

//   return (
//     <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
//   );
// };

// export default withTheme(FilterSelect);
