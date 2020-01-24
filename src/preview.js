/* eslint-disable */
import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Checkbox,
  DatePicker,
  Dropdown,
  Filterselect,
  Filterslider,
  // Toast,
  Message,
  Multiselect,
  Modal,
  Input,
  Radio,
  Searchbar,
  Select,
  Toggle,
  Tooltip,
  withTooltip,
  SideBar,
  Slider,
  Tag
} from './lib';
import 'moment/locale/it';
import { withNotification } from './lib/hoc';
import Calendar from './lib/components/Calendar/calendar';

import toast from './lib/components/Toast';

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
const ButtonNoty = withNotification(Button);

export default () => {
  const [state, setState] = useState({
    inputValue: '',
    messages: [],
    inputError: false,
    showMenu: false
  });

  function changeMessage() {
    let random = Math.floor(Math.random() * 100);
    let msg = 'message ' + random;
    // let messages = state.messages
    // messages.push({ content: msg, duration: random * 100 })
    // setState({ messages })
    toast.notify(msg);
  }

  function onInputChange(data) {
    const { value } = data;
    setState({ inputValue: value, inputError: false });

    if (value === 'error') {
      console.log('is error');
      setState({ inputError: true });
    }
  }

  function fillInput() {
    console.log('fill input');
    setState({ inputValue: 'input filled' });
  }

  async function handleSearchbar(value) {
    let suggestions = [];
    if (value !== '') {
      suggestions = await getSuggestions(value);
    }
    setState({ suggestions });
  }

  return (
    <Flex>
      <SideBar
        isWide={state.showMenu}
        renderHeader={() => (
          <MenuHeader>
            <span onClick={() => setState({ showMenu: false })}>&times;</span>
          </MenuHeader>
        )}
        renderMenu={() => <Item>menu item</Item>}
      ></SideBar>
      <Root>
        <Calendar />
        <Tag label='badge' icon='delete' />
        <Tooltip render='This is a tooltip 4'>
          <Button
            kind='primary'
            onClick={() => setState({ showMenu: !state.showMenu })}
          >
            4
          </Button>
        </Tooltip>
        <br />
        <Message kind='success'>
          <p>Message Component</p>
        </Message>
        <Button label='change message' onClick={() => changeMessage()} />
        <br />
        <Slider showTooltip />
        <br />
        <Slider min={100} max={300} range showTooltip />
        <br />
        <Slider range showTooltip min={2012} max={2032} />
        <br />
        <Checkbox label='checkbox label' name='accept' />
        <br />
        <Toggle onChange={(e, data) => console.log(data)} />
        <br />
        <Flex>
          <Button kind='warning' icon='default' label='icon label' />
          <Button kind='primary' icon='default' label='reverse' reverse />
          <Button kind='ghost' icon='default' round />
          <Button kind='ghost' label='ghost' />
          <Button kind='error' icon='default' href='/' />
        </Flex>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Option
              action={() => console.log('create')}
              label='create'
            />
            <Dropdown.Option action={() => console.log('edit')} label='edit' />
            <Dropdown.Option action={() => alert('delete')} label='delete' />
          </Dropdown>
          <Button icon='default' label='icon label' />
          <Button icon='default' label='reverse' reverse />
          <Dropdown>
            <Dropdown.Option
              action={() => console.log('create')}
              label='create'
            />
            <Dropdown.Option action={() => console.log('edit')} label='edit' />
            <Dropdown.Option action={() => alert('delete')} label='delete' />
          </Dropdown>
          <Button label='ghost' />
          <Button icon='default' href='/' />
        </ButtonGroup>
        <br />
        <DatePicker
          label='start date'
          min={new Date('09/09/2019')}
          max={new Date('03/09/2020')}
          placeholder='Selezione la dataaaa'
        />
        <br />
        <Dropdown>
          <Dropdown.Option
            action={() => console.log('create')}
            label='create'
          />
          <Dropdown.Option action={() => console.log('edit')} label='edit' />
          <Dropdown.Option action={() => alert('delete')} label='delete' />
        </Dropdown>
        <ButtonNoty kind='warning' count='9' label='0' />
        <Dropdown
          renderButton={show => <span onClick={show}>Custom Dropdown</span>}
        >
          <Dropdown.Option
            action={() => console.log('create')}
            label='create'
          />
          <Dropdown.Option action={() => console.log('edit')} label='edit' />
          <Dropdown.Option action={() => alert('delete')} label='delete' />
        </Dropdown>
        <br />
        <Modal shouldCloseOnOverlayClick>
          <Tooltip render='This is a tooltip 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'>
            <Button kind='primary'>2</Button>
          </Tooltip>
        </Modal>
        <br />
        <Filterslider placeholder='select range' min={100} max={500} />
        <Filterselect
          options={bands}
          placeholder='select your favorite rock bands'
          onChange={values => console.log('Multiselect values:', values)}
        />
        <br />
        <ButtonTip kind='primary' type='submit' name='btn' value='primary'>
          PRIMARY
        </ButtonTip>
        <Button kind='error'>ERROR</Button>
        <Button role='button' kind='primary' disabled>
          DISABLED
        </Button>
        <ButtonTip kind='success' tooltip='success button'>
          SUCCESS
        </ButtonTip>
        <Button kind='ghost'>GHOST</Button>
        <Button href='/' kind='warning' label='LINK' />
        <Tooltip render='tip'>
          <Button kind='primary'>1</Button>
        </Tooltip>
        <Tooltip render='This is a tooltip 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'>
          <Button kind='primary'>2</Button>
        </Tooltip>
        <Tooltip render='This is a tooltip 3 Lorem ipsum dolor'>
          <Button kind='primary'>3</Button>
        </Tooltip>
        <br />
        <Input placeholder='email' />
        <Input
          placeholder='Name'
          onChange={(e, value) => onInputChange(value)}
          // value={state.inputValue}
          isError={state.inputError}
        />
        <Button onClick={() => fillInput()}>Fill Input</Button>
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
          <Button kind='primary'>6</Button>
        </Tooltip>
        <BottomRight>
          <Dropdown>
            <div onClick={() => console.log('create')}>create</div>
            <div onClick={() => console.log('edit')}>edit</div>
            <div onClick={() => alert('delete')}>delete</div>
          </Dropdown>
          <Tooltip render='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'>
            <Button kind='primary'>5</Button>
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
    </Flex>
  );
};

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
  flex-grow: 1;
  overflow: scroll;
`;
const Flex = styled.div`
  display: flex;
  max-height: 100vh;
`;
const BottomRight = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50px;
`;
const MenuHeader = styled.div`
  height: 300px;
  background: darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  & > span {
    cursor: pointer;
  }
`;
const Item = styled.div``;
