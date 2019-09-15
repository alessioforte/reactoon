/* eslint-disable */
import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Filterselect,
  Multiselect,
  Icon,
  Input,
  Radio,
  Searchbar,
  Select,
  Toggle,
  Tooltip,
  withTooltip
} from './lib';

import 'moment/locale/it';

const langs = [
  { label: 'italiano', value: 'it' },
  { label: 'inglese', value: 'en' },
  { label: 'spagnolo', value: 'es' },
  { label: 'francese', value: 'fr' },
  { label: 'tedesco', value: 'ge' },
  { label: 'russo', value: 'ru' }
];

const bands = [
  { label: 'Kasabian', value: 'Kasabian' },
  { label: 'Oasis', value: 'Oasis' },
  { label: 'Franz Ferdinand', value: 'Franz Ferdinand' },
  { label: 'Strokes', value: 'Strokes' },
  { label: 'Beatles', value: 'Beatles' },
  { label: 'Rolling Stones', value: 'Rolling Stones' },
  { label: 'Queen', value: 'Queen' },
  { label: 'Deep Purple', value: 'Deep Purple' },
  { label: 'Led Zeppelin', value: 'Led Zeppelin' },
  { label: 'Rainbow', value: 'Rainbow' },
  { label: 'Pink Floyd', value: 'Pink Floyd' },
  { label: 'Coldplay', value: 'Coldplay' },
  { label: 'Muse', value: 'Muse' },
  { label: 'The Doors', value: 'The Doors' },
  { label: 'Killers', value: 'Killers' },
  { label: 'The Smiths', value: 'The Smiths' },
  { label: 'Whitesnakes', value: 'Whitesnakes' }
];

// const radioOptions = [
//     { text: 'yes', value: 'yes' },
//     { text: 'no', value: 'no' },
//     { text: 'maybe', value: 'myaybe' }
// ]

const getSuggestions = value => {
  if (value === '') return;
  return new Promise((resolve, reject) => {
    let suggestions = [];
    suggestions = bands.filter(item => {
      let label = item.label.toLowerCase();
      return label.includes(value.toLowerCase());
    });
    resolve(suggestions);
  });
};

const ButtonTip = withTooltip(Button);
export default class Preview extends Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      inputError: false
    };
  }

  onInputChange(value) {
    console.log(value);
    this.setState({ inputValue: value, inputError: false });

    if (value === 'error') {
      console.log('is error');
      this.setState({ inputError: true });
    }
  }

  fillInput() {
    console.log('fill input');
    this.setState({ inputValue: 'input filled' });
  }

  async handleSearchbar(value) {
    let suggestions = [];
    if (value !== '') {
      suggestions = await getSuggestions(value);
    }
    this.setState({ suggestions });
  }

  render() {
    return (
      <Root>
        <Tooltip render='This is a tooltip 4'>
          <Button status='primary'>4</Button>
        </Tooltip>
        <br />
        <Checkbox label='checkbox label' name='accept' />
        <br />
        <Toggle onChange={(e, data) => console.log(data)} />
        <Button status='error' icon='default' label='click me' />
        <Button status='primary' icon='default' label='click me' reverse />
        <Button status='ghost' icon='default' round />
        <Button status='error' icon='default' href='/' />
        <br />
        <Dropdown>
          <Dropdown.Option
            action={() => console.log('create')}
            label='create'
          />
          <Dropdown.Option action={() => console.log('edit')} label='edit' />
          <Dropdown.Option action={() => alert('delete')} label='delete' />
        </Dropdown>
        <br />
        <Tooltip render='This is a tooltip 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'>
          <Button status='primary'>2</Button>
        </Tooltip>
        <br />
        <Filterselect
          options={bands}
          placeholder='select your favorite rock bands'
          onChange={values => console.log('Multiselect values:', values)}
        />
        <br />
        <ButtonTip status='primary' type='submit' name='btn' value='primary'>
          PRIMARY
        </ButtonTip>
        <Button status='error'>ERROR</Button>
        <Button role='button' status='primary' disabled>
          DISABLED
        </Button>
        <ButtonTip status='success' tooltip='success button'>
          SUCCESS
        </ButtonTip>
        <Button status='ghost'>GHOST</Button>
        <Button href='/' status='warning' label='LINK' />
        <Tooltip render='tip'>
          <Button status='primary'>1</Button>
        </Tooltip>
        <Tooltip render='This is a tooltip 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'>
          <Button status='primary'>2</Button>
        </Tooltip>
        <Tooltip render='This is a tooltip 3 Lorem ipsum dolor'>
          <Button status='primary'>3</Button>
        </Tooltip>
        <br />
        <Input placeholder='email' />
        <Input
          placeholder='Name'
          onChange={(e, value) => this.onInputChange(value)}
          value={this.state.inputValue}
          isError={this.state.inputError}
        />
        <Button onClick={() => this.fillInput()}>Fill Input</Button>
        <br />
        <Radio
          name='language'
          label='Select language: '
          inline
          options={langs}
          onChange={value => console.log('Radio value: ', value)}
        />
        <br />
        <SearchComponent />
        <br />
        <Select
          options={langs}
          placeholder='select a language'
          onChange={value => console.log('select value:', value)}
        />
        <br />
        <Multiselect
          options={bands}
          placeholder='select your favorite rock bands'
          onChange={values => console.log('Multiselect values:', values)}
        />
        <br />
        <DatePicker />
        <br />
        <Dropdown>
          <div onClick={() => console.log('create')}>create</div>
          <div onClick={() => console.log('edit')}>edit</div>
          <div onClick={() => alert('delete')}>delete</div>
        </Dropdown>
        <Tooltip render='This is a tooltip 6'>
          <Button status='primary'>6</Button>
        </Tooltip>
        <BottomRight>
          <Dropdown>
            <div onClick={() => console.log('create')}>create</div>
            <div onClick={() => console.log('edit')}>edit</div>
            <div onClick={() => alert('delete')}>delete</div>
          </Dropdown>
          <Tooltip render='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'>
            <Button status='primary'>5</Button>
          </Tooltip>
        </BottomRight>
        <Select
          options={langs}
          placeholder='select a language'
          onChange={value => console.log('select value:', value)}
        />
        <br />
        <Select
          options={langs}
          placeholder='select a language'
          onChange={value => console.log('select value:', value)}
        />
        <br />
        <Select
          options={langs}
          placeholder='select a language'
          onChange={value => console.log('select value:', value)}
        />
        <br />
        <Select
          options={langs}
          placeholder='select a language'
          onChange={value => console.log('select value:', value)}
        />
        <br />
      </Root>
    );
  }
}

const SearchComponent = () => {
  const [suggestions, setSuggestions] = useState([]);

  async function handleSearchbar(value) {
    let suggestions = [];
    if (value !== '') {
      suggestions = await getSuggestions(value);
    }
    setSuggestions(suggestions);
  }

  return (
    <Searchbar
      suggestions={suggestions}
      onChange={value => handleSearchbar(value)}
      onSearch={value => console.log('search', value)}
    />
  );
};

const Root = styled.div`
  padding: 10px;
`;
// const Body = styled.div`
//     color: white;
//     width: 100%;
//     padding: 30px;
//     flex-grow: 1;
//     overflow: scroll;
// `
// const Section = styled.div`
//     margin: 30px 0;
// `
// const Inline = styled.div`
//     display: flex;
//     align-items: center;
// `
// const Column = styled.div`
//     display: flex;
//     flex-direction: column;
// `
// const Container = styled.div`
//     margin: 30px 0;
//     max-width: 800px;
// `
// const BottomAnchor = styled.div`
//     position: absolute;
//     bottom: -200px;
//     right: 0;
//     width: 300px;
//     height: 50px;
//     display: flex;
//     align-items: center;
// `
const BottomRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;
`;
