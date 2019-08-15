import React, { Component } from 'react'

class Loading extends Component {

  componentDidMount() {
    setTimeout(() => {
      var load = 0
      var interval = setInterval(() => {
        load += 1
        if (load > 100) {
          clearInterval(interval)
          return
        }
        this.progress.style.width = load + '%'
      }, 30)
    }, 1000)
  }

  render() {

    const barStyles = {
      width: '650px',
      height: '3px',
      background: '#eee'
    }

    const progressStyles = {
      height: '100%',
      width: '0',
      background: '#2182BD'
    }

    return (
      <div style={barStyles}>
        <div
          style={progressStyles}
          ref={progress => this.progress = progress}
        >
        </div>
      </div>
    )
  }
}

export default Loading
