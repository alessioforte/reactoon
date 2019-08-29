import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { ThemeProvider, withTheme } from 'styled-components'
import Theme, { getContrastYIQ } from '../../theme'
import Icon from '../Icon'

class Multiselect extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            placeholder: props.placeholder || 'select...',
            options: [ ...props.options ] || [],
            values: [],
            selected: [],
            position: {}
        }

        this.dropdown = React.createRef()
        this.content = React.createRef()
        this.hide = this.hide.bind(this)
        this.blur = this.blur.bind(this)
        this.show = this.show.bind(this)
        this.close = this.close.bind(this)
    }

    componentDidMount() {
        this.setDropdownPosition()
    }

    setDropdownPosition() {
        let rect = this.dropdown.current.getBoundingClientRect()
        let position = {
            left: 0,
            right: null,
        }

        if (rect.x + 200 > window.innerWidth) {
            position.left = null
            position.right = '0'
        }

        if (rect.bottom + 300 > window.innerHeight) {
            position.top = null
            position.bottom = 35
        }

        this.setState({ position })
    }

    show(e) {
        this.setDropdownPosition()

        if (!this.state.visible) {
            this.setState({ visible: true })
            document.addEventListener('click', this.hide)
            window.addEventListener('blur', this.blur)
        }
    }

    blur() {
        this.setState({ visible: false })
        document.removeEventListener('click', this.hide)
        window.removeEventListener('blur', this.blur)
    }

    hide(e) {
        var rect = this.content.current.getBoundingClientRect()
        var x = e.clientX
        var y = e.clientY
        if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
            this.setState({ visible: false })
            document.removeEventListener('click', this.hide)
            window.removeEventListener('blur', this.blur)
        }
    }

    close() {
        this.setState({ visible: false })
        document.removeEventListener('click', this.hide)
        window.removeEventListener('blur', this.blur)
    }

    select(item) {
        let selected = this.state.selected
        let values = this.state.values
        selected.push(item)
        values.push(item.value)

        // let index = this.state.options.indexOf(item)
        let options = this.state.options
        // options.splice(index, 1)

        this.setState({
            selected,
            options,
            values
        })

        this.props.onChange(values)
    }

    unselect(e, item) {
        e.stopPropagation()
        // let sIndex = this.state.selected.indexOf(item)
        let selected = this.state.selected
        // selected.splice(sIndex, 1)

        let vIndex = this.state.values.indexOf(item.value)
        let values = this.state.values
        values.splice(vIndex, 1)
        
        let options = this.props.options.filter(item => !selected.includes(item))

        this.setState({
            selected,
            options,
            values
        })

        this.props.onChange(values)
    }

    renderSelected() {
        const { selected } = this.state
        const { theme } = this.props

        return selected.map((item, i) => (
                <div key={`${item}-${i}`}>
                    { item.text }
                    <div onClick={(e) => this.unselect(e, item)}>
                        <Icon name='delete' size='8px' color={theme.colors[getContrastYIQ(theme.colors.primary)]} margin='0 0 0 8px'/>
                    </div>
                </div>
            )
        )
    }

    render() {
        const { isError, theme } = this.props
        const { placeholder, visible, position, options, selected } = this.state

        return (
            <ThemeProvider theme={theme}>
                <Block ref={this.dropdown}>
                    <Button
                        onClick={this.show}
                        isError={isError}
                    >
                        { selected.length > 0 ? <Selected>{ this.renderSelected() }</Selected> : <Placeholder>{ placeholder }</Placeholder> }
                        {/* <Icon><Caret size={8} color={theme.colors[getContrastYIQ(theme.colors.background)]} /></Icon> */}
                        {/* <IconBox><Icon name='caret' size={5} color={theme.colors.ground} /></IconBox> */}
                    </Button>
                    {
                        visible && (
                            <Drop
                                position={position}
                                ref={this.content}
                            >   
                                {/* <Head>
                                    { selected.length > 0 ? <Selected>{ this.renderSelected() }</Selected> : <Placeholder>{ placeholder }</Placeholder> }
                                    <Icon><Caret size={8} color={theme.colors[getContrastYIQ(theme.colors.background)]} /></Icon>
                                </Head> */}
                                <List reverse={position.top ? true : false}>
                                    {
                                        options && options.map((item, i) => (
                                                <li
                                                    key={`${item.value}-${i}`}
                                                    onClick={(e) => { this.select(item) }}
                                                >{ item.text }
                                                </li>
                                            )
                                        )
                                    }
                                </List>
                            </Drop>
                        )
                    }
                </Block>
            </ThemeProvider>
        )
    }
}

Multiselect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange: PropTypes.func.isRequired
}

Multiselect.defaultProps = {
    placeholder: 'select...',
    onChange: () => {},
    theme: Theme.styles
}

export default withTheme(Multiselect)

const Block = styled.div`
    box-sizing: border-box;
    flex-shrink: 0;
    position: relative;
    height: 35px;
    padding: 5px 0;
`
const Button = styled.div`
    border-radius: ${props => props.theme.borders.radius + 'px'};
    border: 1px solid ${props => props.isError ? props.theme.colors.error : props.theme.colors.background};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content:space-between;
    min-width: 200px;
    min-height: 30px;
    font-size: 12px;
    background: ${props => props.theme.colors.background};
    color: ${props => props.value ? props.theme.colors[getContrastYIQ(props.theme.colors.background)] : props.theme.colors.idle};
    padding: 0 10px;
    &:hover {
        border-color: ${props => props.theme.colors.ground};
    }
`
const Drop = styled.div.attrs(({ position }) => ({ style: position }))`
    margin: 5px 0;
    border-radius: ${props => props.theme.borders.radius + 'px'};
    padding-bottom: 5px;
    position: absolute;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-width: 200px;
    width: 100%;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
    border: 1px solid ${props => props.theme.colors.background};
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
    font-size: 12px;
    z-index: 9;
`
const List = styled.div`
    display: flex;
    flex-direction: ${props => props.reverse ? 'column' : 'column-reverse'};
    order: ${props => props.reverse ? '0' : '-1'};
    overflow: scroll;
    max-height: 338px;
    li {
        display: flex;
        align-items: center;
        min-height: 28px;
        padding: 0 10px;
        list-style-type: none;
        margin: 0;
    }
    li:hover {
        background: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
        cursor: pointer;
    }
`
const Selected = styled.div`
    color: ${props => props.isText ? props.theme.colors.idle : props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
    & > div {
        display: inline-block;
        background: ${props => props.theme.colors.primary};
        padding: 3px 6px;
        margin: 1px;
        border-radius: 3px;
        div {
            display: inline-block;
            margin-left: 10px;
        }
    }
    svg:hover {
        cursor: pointer;
    }
`
// const Head = styled.div`
//     border-radius: ${props => props.theme.colors.borderRadius + 'px'};
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     min-height: 28px;
//     font-size: 12px;
//     background: ${props => props.theme.colors.background};
//     padding: 0 10px;
// `
const Placeholder = styled.div`
    color: ${props => props.theme.colors.idle};
`
// const IconBox = styled.div`
//     min-width: 20px;
//     display: flex;
//     align-items: center;
//     justify-content: flex-end;
// `
