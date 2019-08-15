import React, { Component } from 'react'
import PropTypes from 'prop-types'
import colors from '../../theme/colors'
import { Caret, Delete } from '../../icons'
import { SliderRange } from '../../'
import { Block, Button, Drop, Content, Selected, Head, Placeholder, Icon, Control, IsSelected } from './styled'

class FilterSlider extends Component {

    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            value: {
                min: props.min || 0,
                max: props.max || 100
            },
            position: {},
            reset: true
        }

        this.placeholder = props.placeholder || 'select...'
        this.dropdown = React.createRef()
        this.content = React.createRef()
        this.hide = this.hide.bind(this)
        this.blur = this.blur.bind(this)
        this.show = this.show.bind(this)
        this.close = this.close.bind(this)

        this.selectAll = this.selectAll.bind(this)
        this.unselectAll = this.unselectAll.bind(this)
        this.onSliderChange = this.onSliderChange.bind(this)
    }

    componentDidMount() {
        this.setDropdownPosition()
    }

    setDropdownPosition() {
        let rect = this.dropdown.current.getBoundingClientRect()
        let position = {
            top: '0',
            left: '0',
            right: null,
            bottom: null
        }

        if (rect.x + 200 > window.innerWidth) {
            position.left = null
            position.right = '0'
        }

        if (rect.bottom + 200 > window.innerHeight) {
            position.top = null
            position.bottom = '0'
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

    select(e, item) {
        let selected = this.state.selected
        let value = this.state.value
        selected.push(item)
        value.push(item.value)

        this.setState({
            selected,
            value
        })

        this.props.onChange(value)
    }

    selectAll(e) {
        let all = [ ...this.options ]
        let value = all.map(item => item.value)

        this.setState({
            selected: all,
            value
        })

        this.props.onChange(value)
    }

    unselectAll(e) {
        const { min, max } = this.props
        const value = { min, max }
        const reset = !this.state.reset

        this.setState({ reset, value })

        this.props.onChange(value)
    }

    unselect(e, item) {
        e.stopPropagation()

        let sIndex = this.state.selected.indexOf(item)
        let selected = this.state.selected
        selected.splice(sIndex, 1)

        let vIndex = this.state.value.indexOf(item.value)
        let value = this.state.value
        value.splice(vIndex, 1)
        
        this.setState({
            selected,
            value
        })

        this.props.onChange(value)
    }

    renderSelected() {
        const { selected } = this.state

        return selected.map((item, i) => (
                <div key={`${item}-${i}`}>
                    { item.text }
                    <div onClick={(e) => this.unselect(e, item)}>
                        <Delete size={8} color={colors.text} margin='0 0 0 8px'/>
                    </div>
                </div>
            )
        )
    }

    onSliderChange(value) {
        this.setState({ value })
        this.props.onChange({ ...value })
    }

    render() {
        const { isError, min, max } = this.props
        const { visible, position, value, reset } = this.state

        return (
            <Block ref={this.dropdown}>
            { (min !== value.min || max !== value.max) && <IsSelected /> }
                <Button
                    onClick={this.show}
                    isError={isError}
                >
                    <Placeholder>{ this.placeholder }</Placeholder>
                    <Icon><Caret size={8} color={colors.idle} /></Icon>
                </Button>
                {
                    visible && (
                        <Drop position={position} ref={this.content}>
                            <Head>
                                <Placeholder>{ this.placeholder }</Placeholder>
                                <Icon><Caret size={8} color={colors.idle} /></Icon>
                            </Head>
                                <Control reverse={position.top ? true : false}>
                                    <Selected>{value.min} - {value.max}</Selected>
                                    { (min !== value.min || max !== value.max) && <div className='button' onClick={this.unselectAll}>Reset</div> }
                                </Control>
                            <Content reverse={position.top ? true : false}>
                                <SliderRange
                                    min={min}
                                    max={max}
                                    initialValue={{ min: value.min, max: value.max }}
                                    onChange={this.onSliderChange}
                                    reset={reset}
                                    width={220}
                                />
                            </Content>
                        </Drop>
                    )
                }
            </Block>
        )
    }
}

FilterSlider.propTypes = {
    onChange: PropTypes.func.isRequired
}

FilterSlider.defaultProps = {
    placeholder: 'select...',
    onChange: () => {}
}

export default FilterSlider
