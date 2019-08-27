import React, { Component, useState } from 'react'
import styled from 'styled-components'
import {
        // Menu,
        Dropdown,
        Select,
        Multiselect,
        Filterselect,
        // Filterslider,
        // Slider,
        // SliderRange,
        // SliderStep,
        Toggle,
        Checkbox,
        Radio,
        // Loading,
        // Spinner,
        // Notification,
        Button,
        Input,
        // Tooltip,
        // SideBar,
        // Modal,
        // Calendar,
        // DatePicker,
        Searchbar,
        DatePicker,
} from './lib'

import 'moment/locale/it'

const langs = [
    { text: 'italiano', value: 'it' },
    { text: 'inglese', value: 'en' },
    { text: 'spagnolo', value: 'es' },
    { text: 'francese', value: 'fr' },
    { text: 'tedesco', value: 'ge' },
    { text: 'russo', value: 'ru' }
]

const bands = [
    { text: 'Kasabian', value: 'Kasabian' },
    { text: 'Oasis', value: 'Oasis' },
    { text: 'Franz Ferdinand', value: 'Franz Ferdinand' },
    { text: 'Strokes', value: 'Strokes' },
    { text: 'Beatles', value: 'Beatles' },
    { text: 'Rolling Stones', value: 'Rolling Stones' },
    { text: 'Queen', value: 'Queen' },
    { text: 'Deep Purple', value: 'Deep Purple' },
    { text: 'Led Zeppelin', value: 'Led Zeppelin' },
    { text: 'Rainbow', value: 'Rainbow' },
    { text: 'Pink Floyd', value: 'Pink Floyd' },
    { text: 'Coldplay', value: 'Coldplay' },
    { text: 'Muse', value: 'Muse' },
    { text: 'The Doors', value: 'The Doors' },
    { text: 'Killers', value: 'Killers' },
    { text: 'The Smiths', value: 'The Smiths' },
    { text: 'Whitesnakes', value: 'Whitesnakes' }
]

// const radioOptions = [
//     { text: 'yes', value: 'yes' },
//     { text: 'no', value: 'no' },
//     { text: 'maybe', value: 'myaybe' }
// ]

const getSuggestions = (value) => {
    if (value === '') return
    return new Promise((resolve, reject) => {
        let suggestions = []
        suggestions = bands.filter(item => {
            let text = item.text.toLowerCase()
            return text.includes(value.toLowerCase())
        })
        resolve(suggestions)
    })
}
export default class Preview extends Component {

    constructor() {
        super()

        this.state = {
            inputValue: ''
        }
    }


    onInputChange(value) {
        console.log(value)
        this.setState({ inputValue: value })
    }

    fillInput() {
        console.log('fill input')
        this.setState({ inputValue: 'input filled' })
    }

    async handleSearchbar(value) {
        let suggestions = []
        if (value !== '') {
            suggestions = await getSuggestions(value)
        }
        this.setState({ suggestions })
    }

    render() {
        return (
            <Root>
                <Button>test</Button>
                <br />
                <Checkbox />
                <br />
                <Toggle />
                <br />
                <Dropdown>
                    <div onClick={() => console.log('create')}>create</div>
                    <div onClick={() => console.log('edit')}>edit</div>
                    <div onClick={() => alert('delete')}>delete</div>
                </Dropdown>
                <br />
                <Filterselect
                    options={bands}
                    placeholder='select your favorite rock bands'
                    onChange={(values) => console.log('Multiselect values:', values)}
                />
                <br />
                <Input placeholder='email' />
                <Input
                    placeholder='Name'
                    onChange={(e, value) => this.onInputChange(value)}
                    value={this.state.inputValue}
                />
                <Button onClick={() => this.fillInput()}>Fill Input</Button>
                <br />
                <Radio
                    name='radio'
                    label='Are you sure?'
                    options={langs}
                    onChange={(value) => console.log('Radio value: ', value)}
                />
                <br />
                <SearchComponent />
                <br />
                <Select
                    options={langs}
                    placeholder='select a language'
                    onChange={(value) => console.log('select value:', value)}
                />
                <br />
                <Multiselect
                    options={bands}
                    placeholder='select your favorite rock bands'
                    onChange={(values) => console.log('Multiselect values:', values)}
                />
                <br />
                <DatePicker />
            </Root>
        )
    }
}

const SearchComponent = () => {

    const [suggestions, setSuggestions] = useState([])

    async function handleSearchbar(value) {
        let suggestions = []
        if (value !== '') {
            suggestions = await getSuggestions(value)
        }
        setSuggestions(suggestions)
    }

    return (
        <Searchbar
            suggestions={suggestions}
            onChange={(value) => handleSearchbar(value)}
            onSearch={(value) => console.log('search', value)}
        />
    )
}

const Root = styled.div`
    padding: 10px;
`
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