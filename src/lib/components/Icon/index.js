import React from 'react'
import { Svg } from './styled'
import icons from './icons'

const Icon = ({ name, color, size }) => {
    const { d, width } = icons[name]
    return (
        <div>
            <Svg
                color={color}
                height={size || 30}
                x='0px'
                y='0px'
                viewBox={`0 0 ${width} 512`}
            >
                <path d={d} />
            </Svg>
        </div>
    )
}

Icon.propTypes = {
    name: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number
};

Icon.defaultProps = {
    name: 'default',
    color: '#FFFFFF',
    size: 30
};

export default Icon