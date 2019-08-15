import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

export default props => (
    <NotificationsBox>
        {props.messages.map((message, idx) => (
            <FlashMessage key={`message-${idx}`} content={message} />
        ))}
    </NotificationsBox>
);

class FlashMessage extends Component {
    constructor() {
        super();

        this.state = {
            show: false,
            time: null
        };

        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        this.clear();
        var time = setTimeout(this.clear, 3000);

        this.setState({
            show: true,
            time: time
        });
    }

    clear() {
        if (this.state.time) clearTimeout(this.state.time);

        this.setState({
            show: false,
            time: null
        });
    }

    render() {
        return this.state.show ? <Message header={this.props.header || null} content={this.props.content || null} type={this.props.type || null} /> : null;
    }
}

const Message = props => {
    return <Box>{props.content}</Box>;
};

const NotificationsBox = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
`;
const animation = keyframes`
  0% {
    width: 0;
    opacity: 0;
    color: lightgreen;
  }
  50% {
    opacity: 0.5;
  }
  95% {
    color: lightgreen;
  }
  100% {
    color: white;
    width: 100%;
    opacity: 1;
  }
`;
const Box = styled.div`
    margin: 9px auto 0;
    background: lightgreen;
    padding: 9px;
    border-radius: 3px;
    border: 1px solid green;
    text-align: center;
    animation-name: ${animation};
    animation-duration: 0.3s;
    animation-timing-function: ease;
    animation-delay: 0s;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
`;
