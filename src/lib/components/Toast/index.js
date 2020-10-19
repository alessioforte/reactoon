import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';

let ROOT_ID = 'root-toast';
class Toast {
  setRoot(APP_NODE, id) {
    ROOT_ID = id;
    let node = document.getElementById(ROOT_ID);
    if (!node) {
      node = document.createElement('div');
      node.setAttribute('id', ROOT_ID);
      APP_NODE.insertAdjacentElement('afterend', node);
    }

    ReactDOM.render(<ToastManager actions={this.bindNotify} />, node);
  }

  bindNotify = (fn, removeAll) => {
    this.createNotification = fn;
    this.removeAll = removeAll;
  };

  closeAll = () => {
    if (this.removeAll) {
      this.removeAll();
    }
  };

  notify = (message, options) => {
    if (this.createNotification) {
      this.createNotification(message, options);
    }
  };
}

// class ToastManager extends React.Component {
//   constructor(props) {
//     super(props)

//     this.notify = this.notify.bind(this)
//     this.closeAll = this.closeAll.bind(this)
//     props.actions(this.notify, this.closeAll)

//     this.state = {
//       top: []
//     }
//   }

//   notify(message, options) {
//     console.log(this.state)
//     this.setState({
//       top: [1]
//     })
//   };

//   closeAll() {};

//   close(msg) {
//     console.log(msg)
//     console.log(this.state)
//     // const { top } = this.state
//     // this.setState({
//     //   top: top.filter(m => m !== msg)
//     // })
//   }

//   render() {
//     const { top } = this.state
//     return (
//       <ToastContainer>
//         {top.map((message, idx) => (
//           <Message
//             content={message}
//             key={`message-${idx}`}
//             dismiss={(m) => this.close(m)}
//           />
//         ))}
//       </ToastContainer>
//     )
//   }
// }

const ToastManager = ({ actions }) => {
  const [top, setTop] = useState([]);
  const [closed, setClosed] = useState([]);

  const notify = (message, options) => {
    const arr = top.filter(m => !closed.includes(m));
    setTop([...arr, message]);
    setClosed([]);
  };

  const closeAll = () => {};

  const close = msg => {
    // const messages = top.filter((m, i) => i !== index)
    // console.log('index',index)
    // setTop([ ...messages ])
    setClosed([...closed, msg]);
  };

  actions(notify, closeAll);

  return (
    <ToastContainer>
      {top.map((message, idx) => (
        <Message content={message} key={`message-${idx}`} dismiss={close} />
      ))}
    </ToastContainer>
  );
};

const Message = ({ dismiss, content }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(time + 1);
    }, 1000);
    if (time > 5) {
      clearTimeout(timeout);
      dismiss(content);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [content, dismiss, time]);

  return (
    time < 5 && (
      <Box>
        {content} {time}
      </Box>
    )
  );
};

const ToastContainer = styled.div`
  position: absolute;
  background: red;
  top: 10px;
  right: 10px;
  width: auto;
  display: flex;
  justify-content: center;
  flex-direction: column-reverse;
  z-index: 999;
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

export default new Toast();
