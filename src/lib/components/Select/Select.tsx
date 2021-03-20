import React, { useState, FC } from 'react';
import { withTheme } from 'styled-components';
import Theme from '../../theme';
import Dropbox from '../Dropbox';
import Icon from '../Icon';
import { Target, Options, Option } from '../Styled';

interface Props {
  placeholder?: string;
  options?: Option[]
  isError?: boolean;
  onChange?: (data: any) => void;
  theme?: any
}

interface Option {
  label: string;
  value: any;
}

const Select: FC<Props> = ({
  placeholder = 'select...',
  options,
  isError = false,
  onChange = data => console.log(data),
  theme = Theme.styles
}) => {
  const [state, setState] = useState<Option>({
    label: placeholder,
    value: null
  });

  const select = (item, callback) => {
    const { label, value } = item;
    setState({ label, value });
    onChange(item.value);
    callback();
  };

  const renderTarget = ({ show }) => (
    <Target onClick={show} isError={isError} value={state.value} tabIndex={0}>
      {state.label}
      <div className='icon'>
        <Icon name='caret' size='5px' color={theme.colors.ground} />
      </div>
    </Target>
  );
  const renderDropdown = ({ close }) => (
    <Options>
      {options &&
        options.map(option => (
          <Option
            key={`${option.value}`}
            onClick={e => select(option, close)}
            selected={state.label === option.label}
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

export default withTheme(Select);
