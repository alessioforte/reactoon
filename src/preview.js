/* eslint-disable */
import React, { Component, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  DatePicker,
  Dropdown,
  Filterselect,
  Filterslider,
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
      inputError: false,
      showMenu: false
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
      <Flex>
        <SideBar
          isWide={this.state.showMenu}
          renderHeader={() => (
            <MenuHeader>
              <span onClick={() => this.setState({ showMenu: false })}>
                &times;
              </span>
            </MenuHeader>
          )}
          renderMenu={() => <Item>menu item</Item>}
        ></SideBar>
        <Root>
          <Tag label='badge' icon='delete' />
          <Tooltip render='This is a tooltip 4'>
            <Button
              status='primary'
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
            >
              4
            </Button>
          </Tooltip>
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
            <Button status='warning' icon='default' label='icon label' />
            <Button status='primary' icon='default' label='reverse' reverse />
            <Button status='ghost' icon='default' round />
            <Button status='ghost' label='ghost' />
            <Button status='error' icon='default' href='/' />
          </Flex>
          <br />
          <DatePicker label='start date' />
          <br />
          <Dropdown>
            <Dropdown.Option
              action={() => console.log('create')}
              label='create'
            />
            <Dropdown.Option action={() => console.log('edit')} label='edit' />
            <Dropdown.Option action={() => alert('delete')} label='delete' />
          </Dropdown>
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
              <Button status='primary'>2</Button>
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
      </Flex>
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
