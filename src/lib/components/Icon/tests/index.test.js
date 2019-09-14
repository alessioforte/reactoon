import React from 'react'
import { render } from '@testing-library/react'
import Icon from '../index'

describe('<Icon />', () => {
  it('should render and match the snapshot', () => {
    const { container: { firstChild } } = render(<Icon />)
    expect(firstChild).toMatchSnapshot()
  })
})
