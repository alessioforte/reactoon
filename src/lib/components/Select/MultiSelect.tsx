import React, { useState, FC } from 'react';
import { withTheme } from 'styled-components';
import { styles } from '../../theme';
import Dropbox from '../Dropbox';
import Tag from '../Tag';
import { Target, Options, Option } from '../Styled';

interface Props {
  placeholder?: string;
  options?: Option[];
  isError?: boolean;
  onChange?: (data: any) => void;
  theme?: any;
}
interface Option {
  label: string;
  value: any;
  selected?: boolean;
}

type State = {
  values: any[];
  selected: Option[];
  options: Option[];
};

const Multiselect: FC<Props> = ({
  placeholder = 'select...',
  options = [],
  isError = false,
  onChange = data => console.log(data),
  theme = styles
}) => {
  const [state, setState] = useState<State>({
    values: [],
    selected: [],
    options
  });

  const select = (item, i) => {
    const selected = state.selected;
    const values = state.values;
    selected.push(item);
    values.push(item.value);
    options[i].selected = true;
    setState({ selected, values, options });
    onChange(values);
  };

  const unselect = (e, item) => {
    e.stopPropagation();
    const selected = state.selected.filter(s => s.value !== item.value);
    const values = state.values.filter(v => v !== item.value);
    const options = state.options.map(o => {
      if (o.value === item.value) {
        o.selected = false;
      }
      return o;
    });
    setState({ selected, values, options });
    onChange(values);
  };

  const renderSelected = () => {
    return state.selected.map((item, i) => (
      <Tag
        key={`${item}-${i}`}
        label={item.label}
        icon='delete'
        onClick={e => unselect(e, item)}
      />
    ));
  };

  const renderTarget = ({ show }) => (
    <Target onClick={show} isError={isError} tabIndex={0}>
      {state.selected.length > 0 ? (
        <div>{renderSelected()}</div>
      ) : (
        <div>{placeholder}</div>
      )}
    </Target>
  );

  const renderDropdown = () => (
    <Options>
      {options &&
        options.map((option, i) => (
          <Option
            key={`${option.value}-${i}`}
            onClick={e => !option.selected && select(option, i)}
            selected={option.selected}
          >
            {option.label}
          </Option>
        ))}
    </Options>
  );
  return (
    <Dropbox renderTarget={renderTarget} renderDropdown={renderDropdown} />
  );
};

export default withTheme(Multiselect);
