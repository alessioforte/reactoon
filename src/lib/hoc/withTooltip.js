import React from 'react'
import Tooltip from '../components/Tooltip'

export default function withTooltip(Component) {
  return props => {
    const { tooltip, ...rest } = props
    return (
      <Tooltip render={tooltip || 'empty'}>
        <Component { ...rest } />
      </Tooltip>
    )
  }
}
