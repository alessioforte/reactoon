import React, { Component } from 'react';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import Icon from '../Icon';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            placeholder: props.placeholder || '',
            position: {}
        };

        this.dropdown = React.createRef();
        this.content = React.createRef();
        this.hide = this.hide.bind(this);
        this.blur = this.blur.bind(this);
        this.show = this.show.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        this.setDropdownPosition();
    }

    setDropdownPosition() {
        let rect = this.dropdown.current.getBoundingClientRect();
        let position = {
            top: '35px',
            left: '0',
            right: null,
            bottom: null
        };

        if (rect.x + 200 > window.innerWidth) {
            position.left = null;
            position.right = '0';
        }

        if (rect.bottom + 300 > window.innerHeight) {
            position.top = null;
            position.bottom = '35px';
        }

        this.setState({ position });
    }

    show(e) {
        this.setDropdownPosition();

        if (!this.state.visible) {
            this.setState({ visible: true });
            document.addEventListener('click', this.hide);
            window.addEventListener('blur', this.blur);
        }
    }

    blur() {
        this.setState({ visible: false });
        document.removeEventListener('click', this.hide);
        window.removeEventListener('blur', this.blur);
    }

    hide(e) {
        var rect = this.content.current.getBoundingClientRect();
        var x = e.clientX;
        var y = e.clientY;
        if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
            this.setState({ visible: false });
            document.removeEventListener('click', this.hide);
            window.removeEventListener('blur', this.blur);
        }
    }

    close(e) {
        this.setState({ visible: false });
        document.removeEventListener('click', this.hide);
        window.removeEventListener('blur', this.blur);
    }

    render() {
        const { children, theme } = this.props;
        const { placeholder, visible, position } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <Block ref={this.dropdown}>
                    <Button onClick={this.show}>
                        {placeholder === '' ? <Icon name='caret' color={theme.colors[getContrastYIQ(theme.colors.primary)]} size={5} /> : placeholder}
                    </Button>
                    {visible && (
                        <Drop position={position} ref={this.content}>
                            <List onClick={this.close}>{children && children.map((item, i) => <li key={`select-${i}`}>{item}</li>)}</List>
                        </Drop>
                    )}
                </Block>
            </ThemeProvider>
        );
    }
}

Dropdown.propTypes = {};

Dropdown.defaultProps = {
    theme: Theme.styles
};

export default withTheme(Dropdown);

const Block = styled.div`
    flex-shrink: 0;
    position: relative;
`;
const Button = styled.button`
    border-radius: ${props => props.theme.borders.radius + 'px'};
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 30px;
    height: 30px;
    font-size: 12px;
    background: ${props => props.theme.colors.primary};
    color: white;
    padding: 0 10px;
    border: 0;
    &:focus {
        outline: none;
    }
    &:hover {
        cursor: pointer;
    }
`;
const Drop = styled.div.attrs(({ position }) => ({ style: position }))`
    border-radius: ${props => props.theme.borders.radius + 'px'};
    position: absolute;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
    /* border: 1px solid ${props => props.theme.colors.background}; */
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
    padding: 5px 0;
    font-size: 12px;
    min-width: 200px;
    z-index: 9;
    &::-webkit-scrollbar { 
        display: none; 
    }
`;
const List = styled.div`
    & > li {
        list-style-type: none;
        margin: 0;
        color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.background)]};
    }
    & > li:hover {
        background: ${props => props.theme.colors.hover};
        color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.hover)]};
        cursor: pointer;
    }
    & > li > div {
        padding: 9px;
    }
`;
