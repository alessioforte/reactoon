import React from 'react'
import { Svg } from './styled'
import icons from './icons'

export default ({ name, color, size }) => {
    const d = icons[name].d
    const width = icons[name].width
    return (
        <Svg
            color={color}
            height={size || 30}
            x='0px'
            y='0px'
            viewBox={`0 0 ${width} 512`}
        >
            <path d={d} />
        </Svg>
    )
}
