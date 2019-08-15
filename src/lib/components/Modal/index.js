import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const modalRoot = document.getElementById('modal-root')

class Modal extends Component {

    constructor(props) {
        super(props)

        this.el = document.createElement('div')
        this.handleClose = this.handleClose.bind(this)
        this.outer = React.createRef()        
    }

    componentDidMount() {
        modalRoot.appendChild(this.el)
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el)
    }

    handleClose(e) {
        if (e.target === this.outer.current) this.props.onClose()
    }

    render() {
        const { width, height, children, shouldCloseOnOverlayClick } = this.props

        return ReactDOM.createPortal(
            <Container ref={this.outer} onClick={shouldCloseOnOverlayClick && this.handleClose}>
                <Box width={width} height={height}>
                    { children }
                </Box>
            </Container>,
            this.el
        )
    }
}

export default Modal

const Container = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: grid;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
`
const Box = styled.div`
    padding: 20;
    background: white;
    border-radius: 5px;
    display: inline-block;
    min-height: ${props => props.height ? `${props.height}px` : '600px'};
    min-width: ${props => props.width ? `${props.width}px` : '600px'};
    margin: 1rem;
    position: relative;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    justify-self: center;
    z-index: 999;
`