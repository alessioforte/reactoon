import React from 'react'
import { render } from '@testing-library/react'
import Toggle from '../index'
import { Props } from '../interfaces'
import { styles } from '../../../theme'

describe('<Toggle />', () => {
  it('should render and match the snapshot', () => {
    const props: Props = {
      label: 'text',
      onChange: () => {},
      theme: styles

    }
    const { container: { firstChild } } = render(<Toggle {...props}/>)
    expect(firstChild).toMatchSnapshot()
  })
})
